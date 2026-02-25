import { useActionState } from "react"
import FormError from "../Error/FormError"
import { useIsApiLoadingContext, useLocationContext, useWeatherDataContext, type ErrorType } from "../App"

export default function SearchForm() {

    /* Context */
    const [location, setLocation] = useLocationContext()
    const [weatherData, _setWeatherData] = useWeatherDataContext()
    const [isApiLoading, _setIsApiLoadingContext] = useIsApiLoadingContext()


    /* Action State */
    const [error, searchAction, isPending] = useActionState<ErrorType, FormData>(
        async (_prevError: ErrorType, formData: FormData): Promise<ErrorType> => {
            const locationVal = formData.get('location')

            try {
                // Fetch location
                const locationRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${locationVal}`)
                const { results: locationResults } = await locationRes.json()
                if (!locationResults) throw new Error('No relevant location can be found.')
                
                // Extract and set location state
                // Once location state is changed, it triggers useEffect in App.tsx to fetch weather data
                const { latitude, longitude, name, country, timezone } = locationResults[0]
                setLocation({name: `${name}, ${country}`, timeZone: timezone,latitude, longitude})

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
    if (isPending || location === undefined || weatherData === undefined || isApiLoading) isDisabled=true

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
                        className='text-xl placeholder:text-(--gray-used) placeholder:font-medium grow bg-red outline-0'
                        type='text'
                        placeholder='Search for a place...'
                        name='location'
                        id='location'
                        disabled={isDisabled}
                        autoComplete='off'
                    />
                </div>
                <button
                    className='bg-(--btn-color) w-full px-4 py-2 h-11.25 font-medium rounded-md text-xl cursor-pointer flex justify-center items-center'
                    type='submit'
                    disabled={isDisabled}
                >
                    {isDisabled ? 
                        <>
                            <img src='/assets/images/loading.gif' className='w-7.5'/>
                            {
                                (location === undefined) ?
                                    <span className='text-base'>Fetching location data...</span> :
                                    (weatherData === undefined || isPending || isApiLoading) ?
                                        <span className='text-base'>Fetching weather data...</span> :
                                        <span></span>
                            }
                        </>:
                        <div>Search</div>
                    }
                </button>
            </form>
            { error && <FormError error={error}/>}
        </>
    )
}