
export type LocationContextType = {
    name: string
    timezone: string
    latitude: number
    longitude: number
}

export type LocationContextStateSetterType = React.Dispatch<React.SetStateAction<LocationContextType>>

