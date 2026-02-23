import { useState } from "react"
import { useUnitsContext } from "../App"

export default function UnitMenuSwitch() {

    /* State */
    const [unitType, setUnitType] = useState<number>(0)

    /* Context */
    const [_units, setUnits] = useUnitsContext()

    /* Function */
    function handleUnitSwitch() {
        if (unitType === 0) {
            setUnitType(1)
            setUnits({
                temperature: 1,
                windSpeed: 1,
                precipitation: 1
            })
        }
        else {
            setUnitType(0)
            setUnits({
                temperature: 0,
                windSpeed: 0,
                precipitation: 0
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