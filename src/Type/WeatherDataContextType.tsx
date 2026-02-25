
// type IndexedNumbers = Record<string, number>

// type Current = {
//   time: string
//   temperature_2m: number
//   precipitation: number
//   relative_humidity_2m: number
//   wind_speed_10m: number
//   apparent_temperature: number
//   weather_code: number
// }

// type Hourly = {
//   time: string[]
//   weather_code: IndexedNumbers
//   temperature_2m: IndexedNumbers
// }

// type Daily = {
//   time: string[]
//   weather_code: IndexedNumbers
//   temperature_2m_max: IndexedNumbers
//   temperature_2m_min: IndexedNumbers
// }

// export type WeatherDataContextType = {
//   current: Current
//   hourly: Hourly
//   daily: Daily
// }


// {
//   error?: boolean
//   reason?: string
// }

type Current = {
    time: Date
    temperature_2m: number
    precipitation: number
    relative_humidity_2m: number
    wind_speed_10m: number
    apparent_temperature: number
    weather_code: number
}

type Hourly = {
    time: Date[]
    weather_code: Float32Array<ArrayBufferLike> | null
    temperature_2m: Float32Array<ArrayBufferLike> | null
}

type Daily = {
    time: Date[]
    weather_code: Float32Array<ArrayBufferLike> | null
    temperature_2m_max: Float32Array<ArrayBufferLike> | null
    temperature_2m_min: Float32Array<ArrayBufferLike> | null
}

export type WeatherDataContextType = {
    current: Current
    hourly: Hourly
    daily: Daily
    utcOffsetSeconds: number
} 


export type WeatherDataContextStateSetterType = React.Dispatch<React.SetStateAction<WeatherDataContextType>>