import { fetchWeatherApi } from "openmeteo";

const params = {
    latitude: 3,
    longitude: 101,
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
    hourly: ["weather_code", "temperature_2m"],
    current: ["temperature_2m", "precipitation", "relative_humidity_2m", "wind_speed_10m", "apparent_temperature", "weather_code"],
    timezone: "auto"
}
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const utcOffsetSeconds = response.utcOffsetSeconds();

const current = response.current()!;
const hourly = response.hourly()!;
const daily = response.daily()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const fetchedWeatherData = {
    current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
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
            (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
        ),
        weather_code: hourly.variables(0)!.valuesArray(),
        temperature_2m: hourly.variables(1)!.valuesArray(),
    },
    daily: {
        time: Array.from(
            { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
            (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
        ),
        weather_code: daily.variables(0)!.valuesArray(),
        temperature_2m_max: daily.variables(1)!.valuesArray(),
        temperature_2m_min: daily.variables(2)!.valuesArray(),
    },
};

console.log(fetchedWeatherData)