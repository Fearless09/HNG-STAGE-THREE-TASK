import { useState, useEffect } from 'react'
import { FaArrowCircleUp} from 'react-icons/fa'

function ScrollTopBtn() {
    const [isVisible, setIsVisible] = useState(false);

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`${isVisible ? 'fixed animate-bounce bottom-4 right-4 b-red-700' : 'hidden'}`}>
            <button onClick={scrollToTop}>
                <FaArrowCircleUp color='green' size={'1.5rem'} />
            </button>
        </div>
    )
}

export default ScrollTopBtn
