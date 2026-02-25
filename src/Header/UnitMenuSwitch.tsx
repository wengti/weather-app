import { useState } from "react"
import { useUnitsContext } from "../App"
import { saveUnits } from "../utils/localStorage"

export default function UnitMenuSwitch() {

    /* State */
    const [unitType, setUnitType] = useState<number>(0)

    /* Context */
    const [_units, setUnits] = useUnitsContext()

    /* Function */
    function handleUnitSwitch() {
        if (unitType === 0) {
            setUnitType(1)
            setUnits((prevUnits) => {
                const newUnits = {
                    ...prevUnits,
                    temperature: 1,
                    windSpeed: 1,
                    precipitation: 1
                }

                saveUnits(newUnits)
                return newUnits
            })
        }
        else {
            setUnitType(0)
            setUnits((prevUnits) => {
                const newUnits = {
                    ...prevUnits,
                    temperature: 0,
                    windSpeed: 0,
                    precipitation: 0
                }

                saveUnits(newUnits)
                return newUnits
            })
        }
    }

    /* Returned components */
    return (
        <button
            className='text-left cursor-pointer px-2 py-1 hover:bg-(--bg-layer-2) hover:rounded-md'
            onClick={() => { handleUnitSwitch() }}
        >
            Switch to {unitType === 0 ? "Imperial" : "Metrics"}
        </button>
    )
}