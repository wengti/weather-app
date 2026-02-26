import { useBookmarksContext, useIsApiLoadingContext, useLocationContext } from "../App"

export default function Bookmark(){

    /* Context */
    const [_location, setLocation] = useLocationContext()
    const [_isApiLoading, setIsApiLoading] = useIsApiLoadingContext()
    const [bookmarks, _setBookmarks] = useBookmarksContext()

    /* Obtain bookmark children via mapping */
    const bookmarkChildren = bookmarks.map((bookmark) => {
        return (
            <div 
                className='bg-(--bg-layer-3) px-4 py-2 rounded-md cursor-pointer hover:bg-(--bg-layer-2)'
                onClick={()=>{
                    setIsApiLoading(true)
                    setLocation(bookmark)
                }}
            > 
                {bookmark.name}
            </div>
        )
    })

    return (
        <section className='flex flex-wrap mt-4 gap-2 justify-center'>
            {bookmarkChildren}
        </section>
    )
}