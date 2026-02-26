import { fetchWeatherApi } from "openmeteo"
import type { LocationContextStateSetterType, LocationContextType } from "../Type/LocationContextType"
import type { UnitsContextType } from "../Type/UnitsContextType"
import type { WeatherDataContextStateSetterType } from "../Type/WeatherDataContextType"
import type { ErrorStateSetterType } from "../App"

/* --------------------------------------------- */
/* Type for the Parameters to fetch weather data */
/* --------------------------------------------- */
type ParamsType = {
    latitude: number
    longitude: number
    daily: string[]
    hourly: string[]
    current: string[]
    timezone: string
    wind_speed_unit?: 'mph'
    temperature_unit?: 'fahrenheit'
    precipitation_unit?: 'inch'
}

/* ------------------ */
/* Fetch Weather Data */
/* ------------------ */
async function fetchWeatherData(
    params: ParamsType,
    setWeatherData: WeatherDataContextStateSetterType,
    setIsApiLoading: React.Dispatch<React.SetStateAction<boolean>>): Promise<void> {

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current()!;
    const hourly = response.hourly()!;
    const daily = response.daily()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const fetchedWeatherData = {
        current: {
            time: new Date((Number(current.time())) * 1000),
            temperature_2m: current.variables(0)!.value(),
            precipitation: current.variables(1)!.value(),
            relative_humidity_2m: current.variables(2)!.value(),
            wind_speed_10m: current.variables(3)!.value(),
            apparent_temperature: current.variables(4)!.value(),
            weather_code: current.variables(5)!.value(),
        },
        hourly: {
            time: Array.from(
                { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
                (_, i) => new Date((Number(hourly.time()) + i * hourly.interval()) * 1000)
            ),
            weather_code: hourly.variables(0)!.valuesArray(),
            temperature_2m: hourly.variables(1)!.valuesArray(),
        },
        daily: {
            time: Array.from(
                { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
                (_, i) => new Date((Number(daily.time()) + i * daily.interval()) * 1000)
            ),
            weather_code: daily.variables(0)!.valuesArray(),
            temperature_2m_max: daily.variables(1)!.valuesArray(),
            temperature_2m_min: daily.variables(2)!.valuesArray(),
        },
        utcOffsetSeconds
    };

    setWeatherData(fetchedWeatherData)
    setIsApiLoading(false)
}


/* -------------------------------------------------- */
/* Wrapper to make getting position an async function */
/* -------------------------------------------------- */
export function getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

/* ------------------------------------------------------------------- */
/* Main Function to get location first then corresponding weather data */
/* ------------------------------------------------------------------- */
export async function fetchInitialWeatherData(
    location: LocationContextType,
    setLocation: LocationContextStateSetterType,
    units: UnitsContextType,
    setWeatherData: WeatherDataContextStateSetterType,
    setLocationError: ErrorStateSetterType,
    setApiError: ErrorStateSetterType,
    setIsApiLoading: React.Dispatch<React.SetStateAction<boolean>>): Promise<void> {

    try {
        // Get the current location name, timezone, lat and long
        let latitude: number = null!
        let longitude: number = null!
        let timezone: string = null!

        if (location === null) {
            setWeatherData(null!) // indicate that there's no valid location after attempting to fetch
            return
        }
        else if (location === undefined) {
            const position = await getCurrentPosition()
            latitude = position.coords.latitude
            longitude = position.coords.longitude
            timezone = 'auto'
            setLocation({id:null ,name: 'Current Location', timezone, latitude, longitude})
        }
        else {
            latitude = location.latitude
            longitude = location.longitude
            timezone = location.timezone
        }


        // Fetch Weather data
        setIsApiLoading(true) //set to loading state
        const params: ParamsType = {
            latitude,
            longitude,
            daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
            hourly: ["weather_code", "temperature_2m"],
            current: ["temperature_2m", "precipitation", "relative_humidity_2m", "wind_speed_10m", "apparent_temperature", "weather_code"],
            timezone
            //setting time zone only helps getting UTC offset from GMT-0
        }

        if (units['windSpeed'] === 1) params.wind_speed_unit = 'mph'
        if (units['temperature'] === 1) params.temperature_unit = 'fahrenheit'
        if (units['precipitation'] === 1) params.precipitation_unit = 'inch'

        await fetchWeatherData(params, setWeatherData, setIsApiLoading)
    }
    catch (error) {
        if (error instanceof GeolocationPositionError) {

            setLocation(null!) // indicating that fetch has been attempted but not success

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    setLocationError(new Error("User denied the request for Geolocation."))
                    break
                case error.POSITION_UNAVAILABLE:
                    setLocationError(new Error("Location information is unavailable."))
                    break
                case error.TIMEOUT:
                    setLocationError(new Error("The request to get user location timed out."))
                    break
                default:
                    setLocationError(new Error("An unknown error occurred when searching for the location."))
            }
        }
        else if (error instanceof Error) {
            setApiError(error)
        }
    }
}