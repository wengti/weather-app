import { useBookmarksContext, useIsApiLoadingContext, useLocationContext } from "../App"
import { getCurrentPosition } from "../utils/fetchWeatherData"
import { deleteSavedLocation, saveLocation } from "../utils/localStorage"

export default function Bookmark() {

    /* Context */
    const [_location, setLocation] = useLocationContext()
    const [_isApiLoading, setIsApiLoading] = useIsApiLoadingContext()
    const [bookmarks, _setBookmarks] = useBookmarksContext()

    /* Class name */
    const bookmarkChildrenClsName = 'bg-(--bg-layer-3) px-4 py-2 rounded-md cursor-pointer hover:bg-(--bg-layer-2) font-semibold'

    /* Function */
    async function handleSetToCurrentLocation() {
        setIsApiLoading(true)
        const position = await getCurrentPosition()
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        const timezone = 'auto'
        deleteSavedLocation()
        setLocation({ id: null, name: 'Current Location', timezone, latitude, longitude })
    }

    /* Obtain bookmark children via mapping */
    const bookmarkChildren = bookmarks.map((bookmark) => {
        return (
            <div
                key={bookmark.id}
                className={bookmarkChildrenClsName}
                onClick={() => {
                    setIsApiLoading(true)
                    saveLocation(bookmark)
                    setLocation(bookmark)
                }}
            >
                {bookmark.name}
            </div>
        )
    })

    return (
        <section className='flex flex-wrap mt-4 gap-2 justify-center'>
            <div className={bookmarkChildrenClsName} onClick={() => { handleSetToCurrentLocation() }}>
                Current Location
            </div>
            {bookmarkChildren}
        </section>
    )
}