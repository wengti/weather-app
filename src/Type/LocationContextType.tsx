
export type LocationContextType = {
    latitude: number
    longitude: number
}

export type LocationContextStateSetterType = React.Dispatch<React.SetStateAction<LocationContextType>>