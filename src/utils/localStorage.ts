import { defaultUnitsContext } from "../App"
import type { LocationContextType } from "../Type/LocationContextType"
import type { UnitsContextType } from "../Type/UnitsContextType"

/* General */
const locationKey = 'location'
const unitsKey = 'units'
const bookmarksKey = 'bookmarks'

type KeyType = 'location' | 'units' | 'bookmarks'
type ValType = LocationContextType | UnitsContextType | LocationContextType[]

function saveToLocalStorage(key:KeyType, value: ValType): void {
    localStorage.setItem(key, JSON.stringify(value))
}

function readFromLocalStorage(key:KeyType ,errVal:any):any {
    const readVal = localStorage.getItem(key)
    if( readVal !== null) return JSON.parse(readVal)
    else return errVal
}

function deleteFromLocalStorage(key:KeyType):void{
    localStorage.removeItem(key)
}

/* Location */
export function saveLocation(locationState:LocationContextType):void{
    saveToLocalStorage(locationKey, locationState)
}

export function readSavedLocation():any{
    return readFromLocalStorage(locationKey, undefined) //if the key cannot be found, set to undefined to trigger fetch current location and therefore weather data
}

export function deleteSavedLocation():void{
    deleteFromLocalStorage(locationKey)
}

/* Units */
export function saveUnits(unitsState:UnitsContextType):void{
    saveToLocalStorage(unitsKey, unitsState)
}

export function readSavedUnits():any{
    return readFromLocalStorage(unitsKey, defaultUnitsContext) //if the key cannot be found, set to default units
}

/* bookmarks */
export function saveBookmarks(bookmarksState:LocationContextType[]):void{
    saveToLocalStorage(bookmarksKey, bookmarksState)
}

export function readSavedBookmarks():any{
    return readFromLocalStorage(bookmarksKey, [])
}


