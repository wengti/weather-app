import { useWeatherDataContext } from "../App";
import convertWeatherCode from "../utils/convertWeatherCode";

export default function Daily() {

    /* Context */
    const [weatherData, _setWeatherData] = useWeatherDataContext()


    /* Derived Element via Mapping */
    // Destructuring
    const { daily } = weatherData
    const { time, weather_code, temperature_2m_max, temperature_2m_min } = daily

    // Mapping
    const dailyGridItems = time.map((timeStr, idx) => {

        const timeObj = new Date(timeStr)
        const day = timeObj.toLocaleDateString('en-MY', {
            weekday: 'short'
        })
        const weatherIconImg = weather_code ? convertWeatherCode(weather_code[idx]) : '/assets/images/icon-error.svg'
        const maxTemperature = temperature_2m_max ? `${Math.round(temperature_2m_max[idx])}°` : `N/A`
        const minTemperature = temperature_2m_min ? `${Math.round(temperature_2m_min[idx])}°` : `N/A`

        return (
            <div key={day} className='bg-(--bg-layer-1) rounded-xl py-4 px-3 flex flex-col items-center'>
                <span className='text-2xl font-semibold'>{day}</span>
                <img src={weatherIconImg} className='w-3/5 my-6'/>
                <div className='w-full flex justify-between'>
                    <div className='text-xl font-semibold'>{maxTemperature}</div>
                    <div className='text-xl font-semibold text-(--gray-used)'>{minTemperature}</div>
                </div>
            </div>
        )


    })

    /* Returned Element */
    return (
        <section className='mb-8'>
            <span className='text-2xl font-semibold'>Daily forecast</span>
            <div className='grid grid-cols-3 gap-4 mt-4'>
                {dailyGridItems}
            </div>
        </section>
    )
}