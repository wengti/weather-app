
export default function ApiError(){



    return (
        <section className='flex flex-col gap-2 items-center grow '>
            <img src='/assets/images/icon-error.svg' className='w-8 mt-auto'/>
            <h1 className='text-4xl font-bold'>Something went wrong</h1>
            <span className='text-center text-(--gray-used) font-medium text-sm w-90'>We couldn't connect to the server (API error). Please try again in a few moments.</span>
            <button 
                className='flex gap-2 py-2 px-3 bg-(--bg-layer-1) text-xs font-base rounded-md mb-auto cursor-pointer'
                onClick={() => {window.location.reload()}}
            >
                <img src='/assets/images/icon-retry.svg' />
                <span>Retry</span>
            </button>
        </section>
    )
}