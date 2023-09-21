import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NavSpace from '../components/NavSpace'
import Images from '../components/Images'
import Loading from '../components/Loading'
import Footer from '../components/Footer'

function ImageGallery({ loginMessage, setLoginMessage }) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        fetch("https://api.pexels.com/v1/search?query=vacations", {
            headers: {
                Authorization: 'goBwQ9Fs2vDkausrHnIZ8f4wshD54sOLm5qdXFkcp9zsHGP0GJVRxB7n'
            }
        })
            .then(response => response.json())
            .then(response => {
                setData(response.photos)
                setIsLoading(false)
            })
            .catch(error => {
                console.log('error', error)
                setIsLoading(false)
            });

        setTimeout(() => {
            setLoginMessage('')
        }, 2000)
    }, [])

    return (
        <div>
            <Navbar />
            <NavSpace />
            {loginMessage && <div className='absolute top-2 left-[50%] translate-x-[-50%] bg-green-600 rounded-md p-5 text-white font-semibold text-lg flex justify-center items-center z-30'>{loginMessage}</div>}
            {isLoading && <Loading />}
            <div className="container mx-auto">
                <h1 className='text-center text-4xl font-medium uppercase'>Image Gallery</h1>
                <Images data={data} setData={setData} />
            </div>
            <Footer />
        </div>
    )
}

export default ImageGallery
