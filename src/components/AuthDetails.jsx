import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { FaUserAlt } from 'react-icons/fa'

function AuthDetails() {
    const [authUser, setAuthUser] = useState(null)
    const [signOutBox, setSignOutBox] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const listen = onAuthStateChanged(auth, user => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
                navigate('/signin')
            }
        })
        return () => listen()
    }, [])

    function userSignOut(e) {
        e.preventDefault()
        signOut(auth)
            .then(() => navigate('/signin'))
            .catch(error => console.log(error))
        setSignOutBox(false)
    }
    return (
        <>
            {authUser ?
                <div className='relative'>
                    <button className='flex items-center gap-2 text-base sm:text-lg' onClick={() => setSignOutBox(!signOutBox)}><FaUserAlt /> {authUser.email}</button>
                    {signOutBox && (
                        <div className='absolute top-8'>
                            <button className='bg-red-900 py-1 px-3 rounded' onClick={userSignOut}>Sign Out</button>
                        </div>
                    )}
                </div>
                : <h1>Sign Out</h1>}
        </>
    )
}

export default AuthDetails
