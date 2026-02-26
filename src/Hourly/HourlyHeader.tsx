import { useState, type JSX } from "react"
import HourlyMenu from "./HourlyMenu"
import { useIsApiLoadingContext } from "../App"
import { FaChevronDown } from "react-icons/fa";

export type PropsType = {
    selectedDay: string
    setSelectedDay: React.Dispatch<React.SetStateAction<string>>
}

export default function HourlyHeader({ selectedDay, setSelectedDay }: PropsType): JSX.Element {

    /* State */
    const [isHourlyMenuOpen, setIsHourlyMenuOpen] = useState<boolean>(false)

    /* Context */
    const [isApiLoading, _setIsApiLoading] = useIsApiLoadingContext()

    /* Returned Element */
    return (
        <div className='flex justify-between items-center mb-4'>
            <div className='flex gap-2'>
                <span className='text-2xl font-semibold lg:text-xl'>Hourly forecast</span>
                {
                    isApiLoading &&
                    <img src='/assets/images/loading.gif' className='w-8' />
                }
            </div>
            <button
                className='flex justify-between items-center gap-2 bg-(--bg-layer-4) px-4 py-2 rounded-xl w-35 relative cursor-pointer border border-(--menu-border)'
                onClick={() => setIsHourlyMenuOpen((prevIsHourlyMenuOpen: boolean): boolean => !prevIsHourlyMenuOpen)}
            >
                <span>{selectedDay}</span>
                <FaChevronDown className='text-(--text-main) text-sm'/>
                {
                    isHourlyMenuOpen &&
                    <HourlyMenu selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
                }
            </button>
        </div>
    )
}