import { useState, useEffect } from 'react'
import { FaImages } from 'react-icons/fa6'
import { BsSearch } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import AuthDetails from './AuthDetails'

function Navbar() {
    const [searchData, setSearchData] = useState('')
    const navigate = useNavigate()
    function submitData(e) {
        e.preventDefault()
        if (searchData) {
            navigate(`/search/${searchData}`)
        }
    }

    const [scrolling, setScrolling] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setScrolling(prevScrollPos < currentScrollPos);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    return (
        <nav className={`${scrolling ? 'hidden' : 'fixed px-2 py-4 md:px-4 w-screen top-0 left-0 bg-[rgba(23,37,84,0.85)] text-white z-20'}`}>
            <div className="container mx-auto flex items-center justify-between gap-4">
                {/* Brand Icon */}
                <Link to={'/'}>
                    <FaImages fill='white' size={'2.75rem'} />
                </Link>

                {/* Search Bar */}
                <div className='flex border-2 border-white rounded-lg relative'>
                    <input type="search" className='md:w-80 lg:w-96 xl:w-[650px] outline-none bg-transparent text-white p-2' placeholder='What do you want?' onChange={(e) => setSearchData(e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') submitData(e) }} />
                    <button className='p-3' type='submit' onClick={submitData}><BsSearch color='white' /></button>
                </div>
                {/* User */}
                <AuthDetails />
            </div>
        </nav>
    )
}

export default Navbar
