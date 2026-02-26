import { useUnitsContext, useWeatherDataContext } from "../App";
import convertToTargetDate from "../utils/convertToTargetDate";
import convertWeatherCode from "../utils/convertWeatherCode";

export default function Daily() {

    /* Context */
    const [weatherData, _setWeatherData] = useWeatherDataContext()
    const [units, _setUnits] = useUnitsContext()


    /* Derived Element via Mapping */
    // Destructuring
    const { daily } = weatherData
    const { time, weather_code, temperature_2m_max, temperature_2m_min } = daily

    // Mapping
    const dailyGridItems = time.map((timeStr, idx) => {

        let timeObj = new Date(timeStr)
        if(units.time === 1) timeObj = convertToTargetDate(timeObj, weatherData.utcOffsetSeconds)
        const day = timeObj.toLocaleDateString('en-MY', {
            weekday: 'short'
        })
        const weatherIconImg = weather_code ? convertWeatherCode(weather_code[idx]) : '/assets/images/icon-error.svg'
        const maxTemperature = temperature_2m_max ? `${Math.round(temperature_2m_max[idx])}°` : `N/A`
        const minTemperature = temperature_2m_min ? `${Math.round(temperature_2m_min[idx])}°` : `N/A`

        return (
            <div key={day} className='bg-(--bg-layer-1) rounded-xl py-4 px-3 flex flex-col items-center border border-(--menu-border)'>
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
            <span className='text-xs text-(--gray-used) leading-none'><br/>Hint: Daily Forecasts use 12:00 AM at the selected location. <br/> Example: Thursday in Melbourne (GMT+11) may display as Wednesday in Malaysia (GMT+8) if viewed in Malaysia's Timezone. <br/>Recommended: Set to Target's timezone when viewing this section.</span>
            
            <div className='grid grid-cols-3 gap-4 mt-4'>
                {dailyGridItems}
            </div>
        </section>
    )
}