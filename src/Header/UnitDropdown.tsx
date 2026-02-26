import { useState } from "react"
import UnitMenu from "./UnitMenu"
import { FaGear } from "react-icons/fa6"
import { FaChevronDown } from "react-icons/fa";

export default function UnitDropdown() {

    /* State */
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    /* Function */
    function toggleMenu(): void {
        setIsMenuOpen((prevIsMenuOpen: boolean): boolean => !prevIsMenuOpen)
    }

    return (
        <section className='relative'>
            <div
                className='flex gap-2 items-center cursor-pointer bg-(--bg-layer-1) px-3 py-1 rounded-md border border-(--menu-border)'
                onClick={() => { toggleMenu() }}
            >
                <FaGear className='text-(--text-main) text-xs'/>
                <span>Units</span>
                <FaChevronDown className='text-(--text-main) text-sm'/>
            </div>

            {isMenuOpen && <UnitMenu />}
        </section>
    )
}