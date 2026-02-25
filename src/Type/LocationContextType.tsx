
export type LocationContextType = {
    id: number | null
    name: string
    timezone: string
    latitude: number
    longitude: number
}

export type LocationContextStateSetterType = React.Dispatch<React.SetStateAction<LocationContextType>>

