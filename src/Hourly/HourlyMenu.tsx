import type { JSX } from "react"
import type { PropsType } from "./HourlyHeader"
import clsx from "clsx"
import { IoMdCheckmark } from "react-icons/io"


export default function HourlyMenu({selectedDay, setSelectedDay}:PropsType):JSX.Element{

    /* Create Dropdown menu via mapping */
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const dropDownChild = days.map( day => {

        const isSelected = day === selectedDay
        const divClsName = clsx({
            'text-left hover:bg-(--bg-layer-2) rounded-md px-2 py-2 cursor-pointer flex justify-between items-center': true,
            'bg-(--bg-layer-2)': isSelected
        })
        return (
            <div
                key={day}
                className={divClsName}
                onClick={()=>{setSelectedDay(day)}}
            >
                <span>{day}</span>
                {isSelected && <IoMdCheckmark className='text-(--text-main)'/>}
            </div>
        )
    })

    /* Returned Element */
    return (
        <div 
            className='absolute top-12 right-0 bg-(--bg-layer-1) flex flex-col gap-1 w-40 border border-(--menu-border) shadow-2xl rounded-md p-2 '>
            {dropDownChild}
        </div>
    )
}