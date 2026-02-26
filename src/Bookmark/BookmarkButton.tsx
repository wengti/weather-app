import { FaRegBookmark, FaBookmark } from "react-icons/fa6"
import { useBookmarksContext, useLocationContext } from "../App"
import { saveBookmarks } from "../utils/localStorage"

export default function BookmarkButton(){

    /* Context */
    const [location, _setLocation] = useLocationContext()
    const [bookmarks, setBookmarks] = useBookmarksContext()

    /* Derived */
    const bookmarkedObj = bookmarks.find((bookmark) => bookmark.id === location.id)

    /* Function */
    function handleBookmark():void{
        setBookmarks((prevBookmarks)=>{
            const newBookmarks = [...prevBookmarks, location]
            saveBookmarks(newBookmarks)
            return newBookmarks
        })
    }

    function handleUnbookmark():void{
        if(bookmarkedObj){
            setBookmarks((prevBookmarks) => {
                const newBookmarks = [...prevBookmarks].filter((bookmark) => bookmark.id !== bookmarkedObj.id)
                saveBookmarks(newBookmarks)
                return newBookmarks
            })
        }
    }

    return(
        <button className='h-6 cursor-pointer'>
            {
                bookmarkedObj ?
                <FaBookmark className='text-2xl text-red-500' onClick={()=>{handleUnbookmark()}}/> :
                <FaRegBookmark className='text-2xl' onClick={()=>{handleBookmark()}}/>
            }
        </button>
    )
}