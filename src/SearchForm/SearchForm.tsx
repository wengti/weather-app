import { useActionState, useState } from "react"
import FormError from "../Error/FormError"
import { useLocationContext, useWeatherDataContext, type ErrorType } from "../App"

export default function SearchForm() {

    /* State */
    const [searchVal, setSearchVal] = useState('')

    /* Context */
    const [location, _setLocation] = useLocationContext()
    const [weatherData, _setWeatherData] = useWeatherDataContext()


    /* Action State */
    const [error, searchAction, isPending] = useActionState<ErrorType, FormData>(
        async (_prevError: ErrorType, formData: FormData): Promise<ErrorType> => {
            const locationVal = formData.get('location')
            setSearchVal('')

            try {
                const locationRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${locationVal}`)
                const { results: locationResults } = await locationRes.json()
                if (!locationResults) throw new Error('No relevant location can be found.')

                const { latitude, longitude } = locationResults[0]
                const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}`)
                const weatherData = await weatherRes.json()
                if (weatherData.error) throw new Error(weatherData.reason)

                console.log('Weather data is fetched')
                return null
            }
            catch (error) {
                if (error instanceof Error) {
                    return error
                }
                return 'An unknown error is caught.'
            }
        },
        null
    )

    /* Derived */
    let isDisabled = false
    if (isPending || location === undefined || weatherData === undefined) isDisabled=true

    return (
        <>
            <form
                className='flex flex-col items-center gap-4'
                action={searchAction}
            >
                <div className='flex gap-4 bg-(--bg-layer-1) rounded-md px-4 py-2 w-full'>
                    {
                        isDisabled ?
                            <img src='/assets/images/loading.gif' className='w-5.6 h-5.25 my-auto'/> :
                            <img src='/assets/images/icon-search.svg' />                            
                    }
                    
                    <input
                        className='text-xl placeholder:text-(--gray-used) placeholder:font-medium grow'
                        type='text'
                        placeholder='Search for a place...'
                        name='location'
                        id='location'
                        value={searchVal}
                        onChange={(event) => { setSearchVal(event.target.value) }}
                        disabled={isDisabled}
                    />
                </div>
                <button
                    className='bg-(--btn-color) w-full px-4 py-2 h-11.25 font-medium rounded-md text-xl cursor-pointer flex justify-center'
                    type='submit'
                    disabled={isDisabled}
                >
                    {isDisabled ? 
                        <img src='/assets/images/loading.gif' className='w-7.5'/> :
                        <div>Search</div>
                    }
                </button>
            </form>
            { error && <FormError error={error}/>}
        </>
    )
}