import type { JSX } from "react"
import { useUnitsContext, useWeatherDataContext } from "../App"
import convertWeatherCode from "../utils/convertWeatherCode"
import convertToTargetDate from "../utils/convertToTargetDate"
import { calculateDays } from "../utils/calculateDays"

type PropsType = {
    selectedDay: string
}

export default function HourlyContent({selectedDay}:PropsType):JSX.Element{

    /* Context */
    const [weatherData, _setWeatherData] = useWeatherDataContext()
    const [units, _setUnits] = useUnitsContext()

    /* Derived Element via Mapping */
    // Now
    let now = new Date()
    if(units.time === 1) now = convertToTargetDate(now, weatherData.utcOffsetSeconds)

    // Destructuring
    const {hourly} = weatherData
    const {time, weather_code, temperature_2m} = hourly

    // Element
    const hourlyContentChildren = time.map( (timeStr, idx) => {
        let timeObj = new Date(timeStr)
        if(units.time === 1) timeObj = convertToTargetDate(timeObj, weatherData.utcOffsetSeconds)
        const timeObjDay = timeObj.toLocaleDateString('en-MY', {weekday: 'long'})
        
        // calculateDays are needed because when timezone is set in fetching weather data
        // it fetches the data starting from the 12am of the same day of that timezone to the next 7 days
        // which can result in the current day (i.e. tuesday) to have part of the data of the next weekday (i.e. next tuesday)
        if(timeObjDay === selectedDay && timeObj > now && (calculateDays(now, timeObj)<=6) ){
            const weatherCodeImgFile = weather_code ? convertWeatherCode(weather_code[idx]) : '/assets/images/icon-error.svg'
            const hourStr = timeObj.toLocaleTimeString('en-MY', {hour: 'numeric', hour12: true}).toUpperCase()
            const temperatureStr = temperature_2m ? `${Math.round(temperature_2m[idx])}°` : 'null'

            return (
                <div 
                    key={idx}
                    className='flex justify-between items-center bg-(--bg-layer-3) rounded-xl px-4 py-2 border border-(--menu-border)'
                >
                    <div className='flex gap-4 items-center'>
                        <img src={weatherCodeImgFile} className='w-1/7'/>
                        <span className='text-xl font-semibold'>{hourStr}</span>
                    </div>
                    <span className='text-(--gray-used) font-semibold text-lg'>{temperatureStr}</span>
                </div>
            )
        }
    })

    /* Returned Element */
    return (
        <div className='flex flex-col gap-4 max-h-120 overflow-auto scroll'>
            {hourlyContentChildren}
        </div>
    )
}