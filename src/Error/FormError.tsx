import type { ErrorType } from "../App"

type PropsType = {
    error: ErrorType
}

export default function FormError({error}:PropsType){
    return (
        <span className='text-red-600 lg:block lg:max-w-225 lg:mx-auto lg:text-left'>
            Error: {error instanceof Error ? error.message : error }
        </span>
    )
}