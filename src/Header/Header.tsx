import UnitDropdown from "./UnitDropdown";


export default function Header(){

    return (
        <header className="flex justify-between items-center sticky z-1 top-0 bg-slate-900 pt-4 pb-2 border-b border-(--menu-border)">
            <img src='/assets/images/logo.svg' />
            <UnitDropdown />
        </header>
    )
}