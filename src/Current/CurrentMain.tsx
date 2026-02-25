import { useIsApiLoadingContext, useLocationContext, useUnitsContext, useWeatherDataContext } from "../App"
import convertToTargetDate from "../utils/convertToTargetDate"
import convertWeatherCode from "../utils/convertWeatherCode"

export default function CurrentMain() {

    /* Context */
    const [location, _setLocation] = useLocationContext()
    const [weatherData, _setWeatherData] = useWeatherDataContext()
    const [isApiLoading, _setIsApiLoading] = useIsApiLoadingContext()
    const [units, _setUnits] = useUnitsContext()

    /* current object */
    const { current } = weatherData

    /* Date */
    let dateObj = new Date(current.time)
    if(units.time === 1) dateObj = convertToTargetDate(dateObj, weatherData.utcOffsetSeconds)
    const dateStr = dateObj.toLocaleDateString('en-MY', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })

    /* Weather Code */
    const weatherCodeImgFile = convertWeatherCode(current.weather_code)

    /* Temperature */
    const temperature = Math.round(current.temperature_2m)
    return (
        <section className='bg-[url("/assets/images/bg-today-small.svg")] bg-no-repeat bg-cover bg-center rounded-2xl col-span-2 flex flex-col gap-4 items-center py-8 h-96'>
            {
                isApiLoading ?
                    <img src='/assets/images/loading.gif' className='w-1/2 my-auto' /> :
                    <>
                        <span className='mt-8 font-bold text-4xl'>{location.name}</span>
                        <span className='font-semibold text-xl text-(--gray-used)'>{dateStr}</span>
                        <div className='flex items-center justify-between mt-4 mb-8 w-3/4 max-w-105'>
                            <img src={weatherCodeImgFile} className='w-1/3' />
                            <span className='grow text-9xl text-center font-semibold'>
                                <span className='italic mr-4'>{temperature}</span>
                                <span>°</span>
                            </span>
                        </div>
                    </>
            }

        </section>
    )
}