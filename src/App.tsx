import { createContext, useContext, useEffect, useState } from "react"
import Header from "./Header/Header"
import Landing from "./Landing/Landing"
import SearchForm from "./SearchForm/SearchForm"
import type { WeatherDataContextType, WeatherDataContextStateSetterType } from "./Type/WeatherDataContextType"
import { type UnitsContextStateSetterType, type UnitsContextType } from "./Type/UnitsContextType"
import type { LocationContextStateSetterType, LocationContextType } from "./Type/LocationContextType"
import ApiError from "./Error/ApiError"
import FormError from "./Error/FormError"
import { fetchInitialWeatherData } from "./utils/fetchWeatherData"
import Current from "./Current/Current"
import Daily from "./Daily/Daily"
import Hourly from "./Hourly/Hourly"


/* ---------- */
/* Error Type */
/* ---------- */
export type ErrorType = null | string | Error
export type ErrorStateSetterType = React.Dispatch<React.SetStateAction<ErrorType>>

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

/* API Loading Context */
const IsApiLoadingContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>(undefined!)
export function useIsApiLoadingContext() {
    return useContext(IsApiLoadingContext)
}

/* --------------- */
/* React Component */
/* --------------- */
export default function App() {

    /* Error - State */
    const [locationError, setLocationError] = useState<ErrorType>(null)
    const [apiError, setApiError] = useState<ErrorType>(null)

    /* Context - State */
    const [location, setLocation] = useState<LocationContextType>(undefined!)
    const [units, setUnits] = useState<UnitsContextType>(defaultUnitsContext)
    const [weatherData, setWeatherData] = useState<WeatherDataContextType>(undefined!)
    const [isApiLoading, setIsApiLoading] = useState<boolean>(false)


    /* Functions */

    /* Derived */
    let isInitialLoading = false
    if (location === undefined || weatherData === undefined) isInitialLoading = true


    /* Effect - get current location */
    useEffect(() => {
        fetchInitialWeatherData(location, setLocation, units, setWeatherData, setLocationError, setApiError, setIsApiLoading)
    }, [location, units])

    /* Returned components */
    return (
        <LocationContext value={[location, setLocation]}>
            <UnitsContext value={[units, setUnits]}>
                <WeatherDataContext value={[weatherData, setWeatherData]}>
                    <IsApiLoadingContext value={[isApiLoading, setIsApiLoading]}>
                        <Header />
                        <main className='min-h-(--main-min-height) flex flex-col'>
                            {
                                apiError ?
                                    <ApiError /> :
                                    <>
                                        <Landing />
                                        <SearchForm />
                                        {locationError && <FormError error={locationError} />}
                                        {
                                            isInitialLoading ?
                                                <></> :
                                                <>
                                                    <Current />
                                                    <Daily />
                                                    <Hourly />
                                                </>
                                        }
                                    </>
                            }

                        </main>
                    </IsApiLoadingContext>
                </WeatherDataContext>
            </UnitsContext>
        </LocationContext>
    )
}