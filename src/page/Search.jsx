import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import NavSpace from '../components/NavSpace'
import Loading from '../components/Loading'
import Images from '../components/Images'
import Footer from '../components/Footer'


function Search() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { tag } = useParams()

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://api.pexels.com/v1/search?query=${tag}`, {
            headers: {
                Authorization: 'goBwQ9Fs2vDkausrHnIZ8f4wshD54sOLm5qdXFkcp9zsHGP0GJVRxB7n'
            }
        })
            .then(response => response.json())
            .then(response => {
                setData(response.photos)
                console.log(response.photos)
                setIsLoading(false)
            })
            .catch(error => {
                console.log('error', error)
                setIsLoading(false)
            });
    }, [tag])

    return (
        <div>
            <Navbar />
            <NavSpace />
            {isLoading && <Loading />}
            <div className="container mx-auto">
                <h1 className='text-2xl text-slate-800 font-medium'>Showing results of <span className='font-bold uppercase'>{tag}</span></h1>
                <Images data={data} setData={setData} />
            </div>
            <Footer />
        </div>
    )
}

export default Search
