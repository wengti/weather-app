import { useIsApiLoadingContext, useUnitsContext, useWeatherDataContext } from "../App";
import convertToTargetDate from "../utils/convertToTargetDate";
import convertWeatherCode from "../utils/convertWeatherCode";

export default function Daily() {

    /* Context */
    const [weatherData, _setWeatherData] = useWeatherDataContext()
    const [units, _setUnits] = useUnitsContext()
    const [isApiLoading, _setIsApiLoading] = useIsApiLoadingContext()

    /* Derived Element via Mapping */
    // Destructuring
    const { daily } = weatherData
    const { time, weather_code, temperature_2m_max, temperature_2m_min } = daily

    // Mapping
    const dailyGridItems = time.map((timeStr, idx) => {

        let timeObj = new Date(timeStr)
        if (units.time === 1) timeObj = convertToTargetDate(timeObj, weatherData.utcOffsetSeconds)
        const day = timeObj.toLocaleDateString('en-MY', {
            weekday: 'short'
        })
        const weatherIconImg = weather_code ? convertWeatherCode(weather_code[idx]) : '/assets/images/icon-error.svg'
        const maxTemperature = temperature_2m_max ? `${Math.round(temperature_2m_max[idx])}°` : `N/A`
        const minTemperature = temperature_2m_min ? `${Math.round(temperature_2m_min[idx])}°` : `N/A`

        return (
            <div key={day} className='bg-(--bg-layer-1) rounded-xl py-4 px-3 flex flex-col items-center border border-(--menu-border) lg:p-2'>
                <span className='text-2xl font-semibold lg:text-lg'>{day}</span>
                <img src={weatherIconImg} className='w-3/5 my-6 lg:w-full lg:my-3 lg:max-w-37.5' />
                <div className='w-full flex justify-between'>
                    <div className='text-xl font-semibold lg:text-lg'>{maxTemperature}</div>
                    <div className='text-xl font-semibold text-(--gray-used) lg:text-lg'>{minTemperature}</div>
                </div>
            </div>
        )


    })

    /* Returned Element */
    return (
        <section className='mb-8 lg:mb-0'>
            <div className='flex gap-2'>
                <span className='text-2xl font-semibold'>Daily forecast</span>
                {
                    isApiLoading &&
                    <img src='/assets/images/loading.gif' className='w-8'/>
                }
            </div>
            <span className='text-xs text-(--gray-used) leading-none lg:text-sm lg:font-medium'>Hint: Daily Forecasts use 12:00 AM at the selected location. <br /> Example: Thursday in Melbourne (GMT+11) may display as Wednesday in Malaysia (GMT+8) if viewed in Malaysia's Timezone. <br />Recommended: Set to Target's timezone when viewing this section.</span>

            <div className='grid grid-cols-3 gap-4 mt-4 lg:grid-cols-7 lg:gap-2'>
                {dailyGridItems}
            </div>
        </section>
    )
}