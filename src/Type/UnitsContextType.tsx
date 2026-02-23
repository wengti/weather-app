export type UnitsContextType = {
    temperature: number
    windSpeed: number
    precipitation: number
}

export const temperatureUnitArr = ['', 'fahrenheit']
export const windSpeedUnitArr = ['', 'mph']
export const precipitationUnitArr = ['', 'inch']


export type UnitsContextStateSetterType = React.Dispatch<React.SetStateAction<UnitsContextType>>