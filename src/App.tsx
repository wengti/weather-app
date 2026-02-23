import { createContext, useContext, useState } from "react"
import Header from "./Header/Header"

/* Type */
type UnitsContextType = {
    temperature: number
    windSpeed: number
    precipitation: number
}

type UnitsContextStateSetterType = React.Dispatch<React.SetStateAction<UnitsContextType>>

/* Units Context */
const defaultUnitsContext:UnitsContextType = {
    temperature: 0,
    windSpeed: 0,
    precipitation: 0
}
    
const UnitsContext = createContext<[UnitsContextType, UnitsContextStateSetterType]>(null!)


export function useUnitsContext():[UnitsContextType, UnitsContextStateSetterType] {
    return useContext(UnitsContext)
}

/* React Component */
export default function App() {

    const [units, setUnits] = useState<UnitsContextType>(defaultUnitsContext)

    return (
        <UnitsContext value={[units, setUnits]}>
            <Header />
        </UnitsContext>
    )
}