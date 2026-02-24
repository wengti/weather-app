import { useUnitsContext, useWeatherDataContext } from "../App"
import { getPrecipitationUnit, getWindSpeedUnit } from "../utils/getUnit"
import CurrentChild from "./CurrentChild"
import CurrentMain from "./CurrentMain"

export default function Current() {

    /* Context */
    const [weatherData, _setWeatherData] = useWeatherDataContext()
    const [units, _setUnits] = useUnitsContext()

    /* current object */
    const { current } = weatherData

    const feelsLikeContent = `${Math.round(current.apparent_temperature)}°`
    const humidityContent = `${Math.round(current.relative_humidity_2m)}%`
    const windSpeedContent = `${Math.round(current.wind_speed_10m)} ${getWindSpeedUnit(units['windSpeed'])}`
    const precipitationContent = `${Math.round(current.precipitation)} ${getPrecipitationUnit(units['precipitation'])}`

    return (
        <section className='grid grid-cols-2 my-8 gap-5'>
            <CurrentMain />
            <CurrentChild title='Feels Like' content={feelsLikeContent} />
            <CurrentChild title='Humidity' content={humidityContent} />
            <CurrentChild title='Wind' content={windSpeedContent} />
            <CurrentChild title='Precipitation' content={precipitationContent} />
        </section>
    )
}