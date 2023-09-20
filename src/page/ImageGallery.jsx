import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NavSpace from '../components/NavSpace'
import Images from '../components/Images'
import Loading from '../components/Loading'
import Footer from '../components/Footer'

function ImageGallery() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        fetch("https://api.pexels.com/v1/search?query=nature", {
            headers: {
                Authorization: 'goBwQ9Fs2vDkausrHnIZ8f4wshD54sOLm5qdXFkcp9zsHGP0GJVRxB7n'
            }
        })
            .then(response => response.json())
            .then(response => {
                setData(response.photos)
                // console.log(response.photos)
                setIsLoading(false)
            })
            .catch(error => {
                console.log('error', error)
                setIsLoading(false)
            });
    }, [])

    return (
        <div>
            <Navbar />
            <NavSpace />
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
