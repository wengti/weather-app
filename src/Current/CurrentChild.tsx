import type { JSX } from "react"

type PropsType = {
    title: string
    content: string
}

export default function CurrentChild({title, content}:PropsType):JSX.Element {

    return (
        <div className='flex flex-col bg-(--bg-layer-1) rounded-xl p-6'>
            <span className='text-(--gray-used) font-semibold text-xl mb-6'>{title}</span>
            <span className='text-4xl'>{content}</span>
        </div>
    )
}