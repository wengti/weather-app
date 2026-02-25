import type { JSX } from "react"
import { useUnitsContext } from "../App"
import clsx from "clsx"
import { saveUnits } from "../utils/localStorage"

/* Type */
type TitleType = 'Temperature' | 'Wind Speed' | 'Precipitation' | 'Time'
type MeasureType = 'temperature' | 'windSpeed' | 'precipitation' | 'time'

type PropsType = {
    title: TitleType
    measure: MeasureType
    content: string[]
}

export default function UnitMenuChild({title, measure, content}:PropsType):JSX.Element {

    /* Context */
    const [units, setUnits] = useUnitsContext()

    /* Function */
    function handleChangeUnit(measure: MeasureType, idx: number): void{
        setUnits((prevUnits) => {
            const newUnits = {...prevUnits}
            newUnits[measure] = idx
            saveUnits(newUnits)
            return newUnits
        })
    }
    
    /* Derived Element */
    const btnGroup:JSX.Element[] = content.map( (elem:string, idx: number):JSX.Element => {
        const isSelected = units[measure] === idx

        const btnClass = clsx({
            'flex justify-between py-1 px-2 rounded-md cursor-pointer hover:bg-(--bg-layer-2)': true,
            'bg-(--bg-layer-2)': isSelected
        })

        return (
            <button 
                className={btnClass}
                key={elem}
                onClick={()=>{handleChangeUnit(measure, idx)}}
            >
                <span>{elem}</span>
                {isSelected && <img src='/assets/images/icon-checkmark.svg'/>}
            </button>
        )
    })

    /* Returned Element */
    return (
        <div className="flex flex-col gap-[0.2rem] border-b pb-3 border-b-(--gray-used)">
            <span className='text-(--gray-used) text-sm px-2'>{title}</span>
            {btnGroup}
        </div>
    )
}