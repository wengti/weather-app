
export function getTemperatureUnit(number:number):string{
    const temperatureUnitArr = ['celcius', 'fahrenheit']
    return temperatureUnitArr[number]
}

export function getWindSpeedUnit(number:number):string{
    const windSpeedUnitArr = ['kmh', 'mph']
    return windSpeedUnitArr[number]
}

export function getPrecipitationUnit(number:number):string{
    const precipitationUnitArr = ['mm', 'inch']
    return precipitationUnitArr[number]
}