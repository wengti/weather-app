export type UnitsContextType = {
    temperature: number
    windSpeed: number
    precipitation: number
    time: number
}


export type UnitsContextStateSetterType = React.Dispatch<React.SetStateAction<UnitsContextType>>