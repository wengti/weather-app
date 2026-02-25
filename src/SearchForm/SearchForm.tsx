import { useActionState, useState } from "react"
import FormError from "../Error/FormError"
import { useIsApiLoadingContext, useLocationContext, useWeatherDataContext, type ErrorType } from "../App"
import { saveLocation } from "../utils/localStorage"

export default function SearchForm() {

    /* Context */
    const [location, setLocation] = useLocationContext()
    const [weatherData, _setWeatherData] = useWeatherDataContext()
    const [isApiLoading, _setIsApiLoadingContext] = useIsApiLoadingContext()

    /* State */
    const [searchVal, setSearchVal] = useState<string>('')
    const [searchError, setSearchError] = useState<ErrorType>(null)
    const [searchSuggestions, setSearchSuggestions] = useState<any[]>([])

    /* Function */
    async function fetchLocationData(locationVal: FormDataEntryValue | string | null): Promise<any[]> {
        if (locationVal !== null) {
            const modLocationVal = String(locationVal).replaceAll(' ', '%20')
            const locationRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${modLocationVal}`)
            const { results: locationResults } = await locationRes.json()
            if (!locationResults) throw new Error('No relevant location can be found.')
            return locationResults
        }
        else {
            return []
        }

    }

    async function handleSearchEntry(event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>): Promise<void> {
        try {
            setSearchError(null)
            setSearchVal(event.target.value) // Update search field
            if (event.target.value.length <= 1) {
                setSearchSuggestions([])
            }
            else {
                let locationResults = await fetchLocationData(event.target.value) // fetch location data
                setSearchSuggestions(locationResults)
            }
        }
        catch (error) {
            setSearchSuggestions([])
            if (error instanceof Error) setSearchError(error)
            else setSearchError('An unknown error is caught')
        }
    }

    function handleSetLocationFromSuggestion(suggestion: any): void {
        const { id, name, country, timezone, latitude, longitude } = suggestion
        const fullName = `${name}, ${country}`
        setSearchVal('')
        setSearchSuggestions([])

        const locationState = { id, name: fullName, timezone, latitude, longitude }
        saveLocation(locationState)
        setLocation(locationState)
    }


    /* Action State */
    const [submitError, searchAction, isPending] = useActionState<ErrorType, FormData>(
        async (_prevSubmitError: ErrorType, formData: FormData): Promise<ErrorType> => {
            const locationVal = formData.get('location')

            try {
                setSearchVal('')
                setSearchSuggestions([])
                // Fetch location
                const locationResults = await fetchLocationData(locationVal)

                // Extract and set location state
                // Once location state is changed, it triggers useEffect in App.tsx to fetch weather data
                const { id, latitude, longitude, name, country, timezone } = locationResults[0]
                const locationState = { id, name: `${name}, ${country}`, timezone, latitude, longitude }
                saveLocation(locationState)
                setLocation(locationState)

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
    if (isPending || location === undefined || weatherData === undefined || isApiLoading) isDisabled = true

    /* Derived Elements */
    const suggestionsChildren = searchSuggestions.map((suggestion) => {
        const { id, name, country } = suggestion
        return (
            <div
                key={id}
                className='px-1 py-2 hover:bg-(--bg-layer-2) rounded-md cursor-pointer'
                onClick={() => { handleSetLocationFromSuggestion(suggestion) }}
            >
                {`${name}, ${country}`}
            </div>
        )
    })


    /* Returned Elements */
    return (
        <>
            <form
                className='flex flex-col items-center gap-4 relative z-1'
                action={searchAction}
            >

                <div className='flex gap-4 bg-(--bg-layer-1) rounded-md px-4 py-2 w-full relative border border-(--menu-border)'>
                    {
                        isDisabled ?
                            <img src='/assets/images/loading.gif' className='w-5.6 h-5.25 my-auto' /> :
                            <img src='/assets/images/icon-search.svg' />
                    }

                    <input
                        className='text-xl placeholder:text-(--gray-used) placeholder:font-medium grow bg-red outline-0 disabled:cursor-not-allowed'
                        type='text'
                        placeholder='Search for a place...'
                        name='location'
                        id='location'
                        value={searchVal}
                        onChange={(event) => { handleSearchEntry(event) }}
                        disabled={isDisabled}
                        autoComplete='off'
                    />

                    {
                        searchSuggestions.length > 0 &&
                        <div className='absolute top-12 bg-(--bg-layer-1) w-full left-0 opacity-90 rounded-md px-4 py-2 flex flex-col gap-1 border border-(--menu-border)'>
                            {suggestionsChildren}
                        </div>
                    }
                </div>

                <button
                    className='bg-(--btn-color) w-full px-4 py-2 h-11.25 font-medium rounded-md text-xl cursor-pointer flex justify-center items-center disabled:cursor-not-allowed'
                    type='submit'
                    disabled={isDisabled}
                >
                    {isDisabled ?
                        <>
                            <img src='/assets/images/loading.gif' className='w-7.5' />
                            {
                                (location === undefined) ?
                                    <span className='text-base'>Fetching location data...</span> :
                                    (weatherData === undefined || isPending || isApiLoading) ?
                                        <span className='text-base'>Fetching weather data...</span> :
                                        <span></span>
                            }
                        </> :
                        <div>Search</div>
                    }
                </button>

            </form>
            {submitError && <FormError error={submitError} />}
            {searchError && <FormError error={searchError} />}
        </>
    )
}