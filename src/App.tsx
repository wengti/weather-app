import { createContext, useContext, useState } from "react"
import Header from "./Header/Header"
import Landing from "./Landing/Landing"
import SearchForm from "./SearchForm/SearchForm"
import type { WeatherDataContextType, WeatherDataContextStateSetterType } from "./Type/WeatherDataContextType"
import type { UnitsContextStateSetterType, UnitsContextType } from "./Type/UnitsContextType"
import type { LocationContextStateSetterType, LocationContextType } from "./Type/LocationContextType"

/* ------------- */
/* Units Context */
/* ------------- */
const defaultUnitsContext: UnitsContextType = {
    temperature: 0,
    windSpeed: 0,
    precipitation: 0
}

const UnitsContext = createContext<[UnitsContextType, UnitsContextStateSetterType]>(null!)
export function useUnitsContext(): [UnitsContextType, UnitsContextStateSetterType] {
    return useContext(UnitsContext)
}

/* --------------- */
/* Weather Context */
/* --------------- */
const WeatherDataContext = createContext<[WeatherDataContextType, WeatherDataContextStateSetterType]>(undefined!)
export function useWeatherDataContext(): [WeatherDataContextType, WeatherDataContextStateSetterType] {
    return useContext(WeatherDataContext)
}

/* ---------------- */
/* Location Context */
/* ---------------- */
const LocationContext = createContext<[LocationContextType, LocationContextStateSetterType]>(undefined!)
export function useLocationContext(): [LocationContextType, LocationContextStateSetterType] {
    return useContext(LocationContext)
}

/* React Component */
export default function App() {

    /* State */
    const [units, setUnits] = useState<UnitsContextType>(defaultUnitsContext)
    const [weatherData, setWeatherData] = useState<WeatherDataContextType>(undefined!)
    const [location, setLocation] = useState<LocationContextType>(undefined!)

    /* Returned components */
    return (
        <LocationContext value={[location, setLocation]}>
            <UnitsContext value={[units, setUnits]}>
                <WeatherDataContext value={[weatherData, setWeatherData]}>
                    <Header />
                    <Landing />
                    <SearchForm />
                </WeatherDataContext>
            </UnitsContext>
        </LocationContext>
    )
}