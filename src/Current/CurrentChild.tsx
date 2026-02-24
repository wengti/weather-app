import type { JSX } from "react"
import { useIsApiLoadingContext } from "../App"

type PropsType = {
    title: string
    content: string
}

export default function CurrentChild({title, content}:PropsType):JSX.Element {

    /* Context */
    const [isApiLoading, _setIsApiLoading] = useIsApiLoadingContext()

    /* Returned Element */
    return (
        <div className='flex flex-col bg-(--bg-layer-1) rounded-xl p-6 border border-(--menu-border)'>
            <span className='text-(--gray-used) font-semibold text-xl mb-6'>{title}</span>
            {
                isApiLoading ?
                    <img src='/assets/images/loading.gif' className='h-10 w-10'/> :
                    <span className='text-4xl'>{content}</span>
            }
        </div>
    )
}