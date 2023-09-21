import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Footer from '../components/Footer'
import { FaEye } from 'react-icons/fa6'
import { FaEyeSlash } from 'react-icons/fa6'

function Signin({ loginMessage, setLoginMessage }) {
    const [account, setAccount] = useState({
        email: "",
        password: "",
        error: ''
    });

    useEffect(() => {
        setTimeout(() => {
            setLoginMessage('')
        }, 1500)
    }, [])

    const [togglePassword, setTogglePassword] = useState(true)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAccount((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const navigate = useNavigate()

    function signIn(e) {
        e.preventDefault()
        signInWithEmailAndPassword(auth, account.email, account.password)
            .then(userCredential => {
                navigate('/')
                setLoginMessage('Login Sucessfully, Welcome!')
            })
            .catch(err => {
                setAccount((prevData) => ({
                    ...prevData,
                    error: err.code,
                }));
                setTimeout(() => {
                    setAccount((prevData) => ({
                        ...prevData,
                        error: '',
                    }));
                }, 1500)
                console.log(err)
            })
    }

    return (
        <div className='min-h-screen flex gap-4 flex-col'>
            <div className='max-w-[450px] w-full mx-auto p-4'>
                <h1 className='text-center my-5 uppercase font-semibold text-3xl'>Sign In</h1>
                <form action="" onSubmit={signIn}>
                    {loginMessage && <p className='text-green-700 font-medium text-xl mb-3'>{loginMessage}</p>}
                    {account.error && <p className='text-red-700 font-medium text-xl mb-3'>{account.error}</p>}
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

                    <button type='submit' className='w-full bg-blue-800 text-white font-normal text-2xl py-2 px-1 rounded-md mt-7 active:scale-[0.99] active:bg-blue-900 mb-2'>LOGIN</button>
                </form>
                <Link to={'/signup'} className='font-normal text-lg hover:text-orange-700'>Don't have an accout? Click Here to Resgister</Link>

            </div>
            <div className='mt-auto'>
                <Footer />
            </div>
        </div>
    )
}

export default Signin
