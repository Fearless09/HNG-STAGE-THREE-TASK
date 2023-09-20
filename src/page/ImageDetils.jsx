import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import NavSpace from '../components/NavSpace'
import Footer from '../components/Footer'
import Loading from '../components/Loading'

function ImageDetils() {
    const { imageID } = useParams()
    // https://api.pexels.com/v1/photos/2014422
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        fetch(`https://api.pexels.com/v1/photos/${imageID}`, {
            headers: {
                Authorization: 'goBwQ9Fs2vDkausrHnIZ8f4wshD54sOLm5qdXFkcp9zsHGP0GJVRxB7n'
            }
        })
            .then(response => response.json())
            .then(response => {
                setData(response)
                console.log(response)
                setIsLoading(false)
            })
            .catch(error => {
                console.log('error', error)
                setIsLoading(false)
            });
    }, [imageID])
    return (
        <>
            <Navbar />
            <NavSpace />
            {isLoading && <Loading />}
            <div className="container mx-auto">
                {data && <>
                    <div className="px-4">
                        <h1 className='font-normal text-xl mb-3'>ALT: <span className='font-bold'>{data.alt}</span></h1>
                        <h1 className='font-normal text-xl mb-3'>Photographer: <a target='_blank' href={data.photographer_url} className='font-bold text-blue-950 hover:text-blue-700'>{data.photographer}</a></h1>
                    </div>
                    <div className="text-center mt-10">
                        <h1 className='text-2xl font-bold mb-3'>IMAGES</h1>
                        {data.src && <>
                            {Object.entries(data.src).map(([size, img], indx) => (
                                <div className='mb-10' key={indx}>
                                    <h1 className='font-normal text-xl mb-1'>Size: <span className='font-bold capitalize'>{size}</span></h1>
                                    <img src={img} className='mx-auto' alt={data.alt} />

                                </div>
                            ))}
                        </>}
                    </div>
                </>}
            </div>
            <Footer />
        </>
    )
}

export default ImageDetils
