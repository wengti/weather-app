import { useState, type JSX } from "react"
import HourlyMenu from "./HourlyMenu"

export type PropsType = {
    selectedDay: string
    setSelectedDay: React.Dispatch<React.SetStateAction<string>>
}

export default function HourlyHeader({selectedDay, setSelectedDay}:PropsType):JSX.Element {

    /* State */
    const [isHourlyMenuOpen, setIsHourlyMenuOpen] = useState<boolean>(false)

    /* Returned Element */
    return (
        <div className='flex justify-between items-center'>
            <span className='text-2xl font-semibold'>Hourly forecast</span>
            <button 
                className='flex justify-between items-center gap-2 bg-(--bg-layer-4) px-4 py-2 rounded-xl w-35 relative cursor-pointer'
                onClick={() => setIsHourlyMenuOpen( (prevIsHourlyMenuOpen:boolean):boolean => !prevIsHourlyMenuOpen )}
            >
                <span>{selectedDay}</span>
                <img src='/assets/images/icon-dropdown.svg'/>
                {
                    isHourlyMenuOpen &&
                    <HourlyMenu selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
                }
            </button>
        </div>
    )
}