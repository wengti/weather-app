import UnitDropdown from "./UnitDropdown";


export default function Header(){

    return (
        <header className="flex justify-between items-center">
            <img src='/assets/images/logo.svg' />
            <UnitDropdown />
        </header>
    )
}