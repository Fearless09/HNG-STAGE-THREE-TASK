import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { ThreeDots } from 'react-loader-spinner'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

function ResetPassword({ loginMessage, setLoginMessage }) {
    const [account, setAccount] = useState({
        email: "",
        error: '',
        loading: false
    });

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        setTimeout(() => {
            setLoginMessage('')
        }, 1500)
    }, [])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAccount((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const navigate = useNavigate()

    function resetPassword(e) {
        e.preventDefault()
        setAccount(prevData => ({ ...prevData, loading: true }))

        const auth = getAuth();
        sendPasswordResetEmail(auth, account.email)
            .then(() => {
                setAccount(prevData => ({ ...prevData, loading: false }))
                navigate('/signin')
                setLoginMessage('Password Reset Link has been sent to your email, Check your email')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setAccount((prevData) => ({
                    ...prevData,
                    error: errorMessage,
                    loading: false
                }));
                setTimeout(() => {
                    setAccount((prevData) => ({
                        ...prevData,
                        error: '',
                    }));
                }, 2500)
                console.log(errorCode, errorMessage)
            });
    }

    return (
        <div className='min-h-screen flex gap-4 flex-col'>
            <div className='max-w-[450px] w-full mx-auto p-4'>
                <h1 className='text-center my-5 uppercase font-semibold text-3xl'>Reset Password</h1>
                <form action="" onSubmit={resetPassword}>
                    {loginMessage && <p className='text-green-700 font-medium text-xl mb-3'>{loginMessage}</p>}
                    {account.error && <p className='bg-red-200 text-gray-800 font-medium text-xl p-2 rounded mb-3'>{account.error}</p>}
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email" className='ms-1 text-xl'>Email:</label>
                        <input type="email" name="email" id="email" placeholder='Enter your email' onChange={handleInputChange} className='border-2 rounded-md p-2 border-blue-300' required />
                    </div>

                    <button type='submit' className='w-full bg-blue-800 text-white font-normal text-2xl py-2 px-1 rounded-md mt-4 active:scale-[0.99] active:bg-blue-900 mb-2 disabled:opacity-75 disabled:scale-100 flex justify-center' disabled={account.loading}>
                        {account.loading ? (
                            <ThreeDots
                                height="32"
                                width="40"
                                radius="9"
                                color="#ffffff"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClassName=""
                                visible={true}
                            />
                        ) : 'RESET PASSWORD'}
                    </button>
                </form>
                <div className='mb-3 mt-5'>
                    <Link to={'/signin'} className='font-normal text-blue-800 text-lg hover:text-blue-500'>Have an accout? Click Here to Login</Link>
                </div>

                <Link to={'/signup'} className='font-normal text-lg hover:text-orange-700'>Don't have an accout? Click Here to Resgister</Link>

            </div>
            <div className='mt-auto'>
                <Footer />
            </div>
        </div>
    )
}

export default ResetPassword
