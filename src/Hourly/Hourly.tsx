import { useState } from "react";
import HourlyHeader from "./HourlyHeader";
import { useWeatherDataContext } from "../App";
import HourlyContent from "./HourlyContent";


export default function Hourly() {

    /* Context */
    const [weatherData, _setWeatherData] = useWeatherDataContext()

    /* Derived */
    const currentDateObj = new Date(weatherData.current.time)
    const currentDay = currentDateObj.toLocaleDateString('en-MY', {weekday: 'long'})

    /* State */
    const [selectedDay, setSelectedDay] = useState<string>(currentDay)

    /* Returned Element */
    return (
        <section className='bg-(--bg-layer-1) mb-4 p-4 rounded-xl'>
            <HourlyHeader selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
            <HourlyContent selectedDay={selectedDay} />
        </section>
    )
}