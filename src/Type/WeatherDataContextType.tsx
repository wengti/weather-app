

type CurrentUnits = {
  time: string
  interval: string
  temperature_2m: string
  precipitation: string
  relative_humidity_2m: string
  wind_speed_10m: string
  apparent_temperature: string
  weather_code: string
}

type Current = {
  time: string
  interval: number
  temperature_2m: number
  precipitation: number
  relative_humidity_2m: number
  wind_speed_10m: number
  apparent_temperature: number
  weather_code: number
}

type DailyUnits = {
  time: string
  weather_code: string
  temperature_2m_max: string
  temperature_2m_min: string
}

type Daily = {
  time: string[]
  weather_code: number[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
}

export type WeatherDataContextType = {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: CurrentUnits
  current: Current
  daily_units: DailyUnits
  daily: Daily
  error?: boolean
  reason?: string
}

export type WeatherDataContextStateSetterType = React.Dispatch<React.SetStateAction<WeatherDataContextType>>