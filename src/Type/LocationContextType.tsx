
export type LocationContextType = {
    name: string
    latitude: number
    longitude: number
}

export type LocationContextStateSetterType = React.Dispatch<React.SetStateAction<LocationContextType>>