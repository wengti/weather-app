import { useState } from "react";
import HourlyHeader from "./HourlyHeader";
import { useUnitsContext, useWeatherDataContext } from "../App";
import HourlyContent from "./HourlyContent";
import convertToTargetDate from "../utils/convertToTargetDate";


export default function Hourly() {

    /* Context */
    const [weatherData, _setWeatherData] = useWeatherDataContext()
    const [units, _setUnits] = useUnitsContext()

    /* Derived */
    let currentDateObj = new Date(weatherData.current.time)
    if(units.time === 1) currentDateObj = convertToTargetDate(currentDateObj, weatherData.utcOffsetSeconds)
    const currentDay = currentDateObj.toLocaleDateString('en-MY', {weekday: 'long'})

    /* State */
    const [selectedDay, setSelectedDay] = useState<string>(currentDay)

    /* Returned Element */
    return (
        <section className='bg-(--bg-layer-1) mb-4 p-4 rounded-xl lg:mb-0 lg:h-(--content-height) lg:min-w-90'>
            <HourlyHeader selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
            <HourlyContent selectedDay={selectedDay} />
        </section>
    )
}