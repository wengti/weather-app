import type { ErrorType } from "../App"

type PropsType = {
    error: ErrorType
}

export default function FormError({error}:PropsType){
    return (
        <span className='text-red-600'>
            Error: {error instanceof Error ? error.message : error }
        </span>
    )
}