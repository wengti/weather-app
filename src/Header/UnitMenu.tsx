import UnitMenuChild from "./UnitMenuChild";
import UnitMenuSwitch from "./UnitMenuSwitch";

export default function UnitMenu() {
    return (
        <div className='absolute top-10 right-0 w-[40vw] bg-(--bg-layer-1) py-2 px-2 rounded-md flex flex-col gap-4 border border-(--menu-border) shadow-2xl lg:max-w-100'>
            <UnitMenuSwitch />
            <UnitMenuChild 
                title='Temperature' 
                measure='temperature' 
                content={['Celcius (°C)', 'Farenheit (°F)']}
            />
            <UnitMenuChild 
                title='Wind Speed' 
                measure='windSpeed' 
                content={['km/h', 'mph']}
            />
            <UnitMenuChild 
                title='Precipitation' 
                measure='precipitation' 
                content={['Millimeters (mm)', 'Inch (in)']}
            />
            <UnitMenuChild 
                title='Time' 
                measure='time' 
                content={['Current Timezone', 'Target Timezone']}
            />
        </div>
    )
}