import { useLocationContext, useWeatherDataContext } from "../App"

export default function Loading(){

    /* Context */
    const [location, _setLocation] = useLocationContext()
    const [weatherData, _setWeatherData] = useWeatherDataContext()

    /* Derived */
    const fetchedDataType = 
        location === undefined ? 
            'location' :
            weatherData === undefined ?
                'weather' :
                ''

    return (
        <section className='mx-auto'>
            <img src='/assets/images/loading.gif' className='w-15 mx-auto -mb-4 mt-4' />
            <span>Fetching {fetchedDataType} data...</span>
        </section>
    )
}