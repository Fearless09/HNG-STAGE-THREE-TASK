import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Footer from '../components/Footer'
import { FaEye } from 'react-icons/fa6'
import { FaEyeSlash } from 'react-icons/fa6'
import { ThreeDots } from 'react-loader-spinner'

function SignUp({ setLoginMessage }) {
    const [account, setAccount] = useState({
        email: "",
        password: "",
        confirmPassword: '',
        error: '',
        loading: false
    });

    const navigate = useNavigate()

    const [togglePassword, setTogglePassword] = useState(true)
    const [toggleRePassword, setToggleRePassword] = useState(true)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAccount((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    function signUp(e) {
        e.preventDefault()
        setAccount(prevData => ({ ...prevData, loading: true }))
        if (account.password === account.confirmPassword) {
            createUserWithEmailAndPassword(auth, account.email, account.password)
                .then(userCredential => {
                    setAccount(prevData => ({ ...prevData, loading: true }))
                    navigate('/signin')
                    setLoginMessage('Account created sucessfully. Login here ')
                })
                .catch(err => {
                    setAccount((prevData) => ({
                        ...prevData,
                        error: err.code,
                        loading: false
                    }));
                    console.log(err)
                })
        } else {
            setAccount((prevData) => ({
                ...prevData,
                error: 'Password does not match',
                loading: false
            }));
        }

        setTimeout(() => {
            setAccount((prevData) => ({
                ...prevData,
                error: '',
            }));
        }, 2500)
    }

    return (
        <div className='min-h-screen flex gap-4 flex-col'>
            <div className='max-w-[450px] w-full mx-auto p-4 '>
                <h1 className='text-center my-5 uppercase font-semibold text-3xl'>Create an Account</h1>
                <form action="" onSubmit={signUp}>
                    {account.error && <p className='bg-red-200 text-gray-800 font-medium text-xl p-2 rounded mb-3'>{account.error}</p>}
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email" className='ms-1 text-xl'>Email:</label>
                        <input type="email" name="email" id="email" placeholder='Enter your Email' onChange={handleInputChange} className='border-2 rounded-md p-2 border-blue-300' required />
                    </div>
                    <div className='flex flex-col gap-2 mt-5'>
                        <label htmlFor="password">Password</label>
                        <div className='overflow-hidden rounded-md relative'>
                            <input type={togglePassword ? 'password' : 'text'} name='password' id='password' placeholder='Enter your password' onChange={handleInputChange} className='w-full border-2 rounded-md p-2 border-blue-300' required />
                            <div className='absolute top-0 right-0 w-min h-full pr-2 flex items-center cursor-pointer'>
                                {togglePassword ? <FaEye onClick={() => setTogglePassword(!togglePassword)} />
                                    : <FaEyeSlash onClick={() => setTogglePassword(!togglePassword)} />
                                }
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 mt-5'>
                        <label htmlFor="re-password">Confirm Password</label>
                        <div className='overflow-hidden rounded-md relative'>
                            <input type={toggleRePassword ? 'password' : 'text'} name='confirmPassword' id='confirmPassword' placeholder='Confirm your password' onChange={handleInputChange} className='w-full border-2 rounded-md p-2 border-blue-300' required />
                            <div className='absolute top-0 right-0 w-min h-full pr-2 flex items-center cursor-pointer'>
                                {toggleRePassword ? <FaEye onClick={() => setToggleRePassword(!toggleRePassword)} />
                                    : <FaEyeSlash onClick={() => setToggleRePassword(!toggleRePassword)} />
                                }
                            </div>
                        </div>
                    </div>

                    <button type='submit' className='w-full bg-blue-800 text-white font-normal text-2xl py-2 px-1 mb-2 rounded-md mt-7 active:scale-[0.99] active:bg-blue-900 disabled:opacity-75 disabled:scale-100 flex justify-center' disabled={account.loading}>
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
                        ) : 'RESIGTER'}
                    </button>
                </form>

                <Link to={'/signin'} className='font-normal text-lg hover:text-orange-700'>Have an accout? Click Here to Login</Link>

            </div>
            <div className='mt-auto '>
                <Footer />
            </div>
        </div>
    )
}

export default SignUp