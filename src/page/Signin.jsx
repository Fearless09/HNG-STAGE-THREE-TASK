import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Footer from '../components/Footer'

function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPaasword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    function signIn(e) {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                navigate('/')
                console.log(userCredential)
            })
            .catch(err => {
                setError('Email or password incorrect')
                console.log(err)
            })
    }

    return (
        <div className='max-w-[450px] mx-auto p-4'>
            <h1 className='text-center my-5 uppercase font-semibold text-3xl'>Sign In</h1>
            <form action="" onSubmit={signIn}>
                {error && <p className='text-red-700 font-medium text-xl mb-3'>{error}</p>}
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className='ms-1 text-xl'>Email:</label>
                    <input type="email" name="email" id="email" placeholder='Enter your Email' onChange={e => setEmail(e.target.value)} className='border-2 rounded-md p-2 border-blue-300' />
                </div>
                <div className='flex flex-col gap-2 mt-5'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id='password' placeholder='Enter your password' onChange={e => setPaasword(e.target.value)} className='border-2 rounded-md p-2 border-blue-300' />
                </div>

                <button type='submit' className='w-full bg-blue-800 text-white font-normal text-2xl py-2 px-1 rounded-md mt-7 active:scale-[0.99] active:bg-blue-900 mb-2'>LOGIN</button>
            </form>
            <Link to={'/signup'}>Don't have an accout? Click Here to Resgister</Link>

            <Footer />
        </div>
    )
}

export default Signin
