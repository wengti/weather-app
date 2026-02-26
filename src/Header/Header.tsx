import { useIsDarkModeContext } from "../App";
import { saveIsDarkMode } from "../utils/localStorage";
import UnitDropdown from "./UnitDropdown";
import { FaLightbulb } from "react-icons/fa";



export default function Header(){

    /* Context */
    const [isDarkMode, setIsDarkMode] = useIsDarkModeContext()

    /* Derived */
    const logoPath = isDarkMode ? '/assets/images/logo.svg' : '/assets/images/logo_black_text.svg'

    /* Function */
    function handleDisplayModeSwitch():void{
        setIsDarkMode((prevIsDarkMode)=>{
            saveIsDarkMode(!prevIsDarkMode)
            return !prevIsDarkMode
        })
    }

    return (
        <header className="flex justify-between items-center sticky z-2 top-0 bg-(--bg-main) pt-4 pb-2 border-b border-(--menu-border)">
            <img src={logoPath}/>
            <FaLightbulb 
                className="ml-auto mr-2 cursor-pointer text-(--text-main)"
                onClick={()=>{handleDisplayModeSwitch()}}
            />
            <UnitDropdown />
        </header>
    )
}