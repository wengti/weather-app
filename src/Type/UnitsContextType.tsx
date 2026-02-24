export type UnitsContextType = {
    temperature: number
    windSpeed: number
    precipitation: number
}


export type UnitsContextStateSetterType = React.Dispatch<React.SetStateAction<UnitsContextType>>