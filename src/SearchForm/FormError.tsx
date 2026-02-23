import type { ErrorState } from "./SearchForm"

type PropsType = {
    error: ErrorState
}

export default function FormError({error}:PropsType){
    return (
        <span className='text-red-600'>
            Error: {error instanceof Error ? error.message : error }
        </span>
    )
}