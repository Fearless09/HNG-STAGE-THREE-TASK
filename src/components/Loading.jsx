import { ColorRing } from 'react-loader-spinner'

function Loading() {
    return (
        <div className='absolute z-10 top-0 left-0 bg-[#00000073] h-screen w-screen flex items-center justify-center'>
            <div className='bg-white rounded-xl h-[172px] w-[172px] text-center p-2'>
                <div className='w-[120px] mx-auto'>
                    <ColorRing
                        visible={true}
                        height="120"
                        width="120"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                </div>
                <h1 className='font-bold text-lg pb-2'>Loading . . .</h1>
            </div>
        </div>
    )
}

export default Loading
