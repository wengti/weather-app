import type { JSX } from "react"
import type { PropsType } from "./HourlyHeader"


export default function HourlyMenu({selectedDay, setSelectedDay}:PropsType):JSX.Element{

    /* Create Dropdown menu via mapping */
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const dropDownChild = days.map( day => {
        return (
            <div
                key={day}
                className='text-left hover:bg-(--bg-layer-2) rounded-md pl-1 py-2 cursor-pointer flex justify-between'
                onClick={()=>{setSelectedDay(day)}}
            >
                <span>{day}</span>
                {day === selectedDay && <img src='/assets/images/icon-checkmark.svg'/>}
            </div>
        )
    })

    /* Returned Element */
    return (
        <div 
            className='absolute top-12 right-0 bg-(--bg-layer-1) flex flex-col w-40 border border-(--menu-border) shadow-2xl rounded-md p-2'>
            {dropDownChild}
        </div>
    )
}