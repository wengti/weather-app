import { useState } from "react"
import UnitMenu from "./UnitMenu"

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
                <img src='/assets/images/icon-units.svg' />
                <span>Units</span>
                <img src='/assets/images/icon-dropdown.svg' />
            </div>

            {isMenuOpen && <UnitMenu />}
        </section>
    )
}