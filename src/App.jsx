import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signin from './page/Signin'
import SignUp from './page/SignUp'
import Search from './page/Search'
import ImageGallery from './page/ImageGallery'
import ImageDetils from './page/ImageDetils'
import ScrollTopBtn from './components/ScrollTopBtn'

function App() {
  const [loginMessage, setLoginMessage] = useState('')


  return (
    <>
      <Routes>
        <Route index element={
          <ImageGallery loginMessage={loginMessage} setLoginMessage={setLoginMessage} />
        } />

        <Route path='/search/:tag' element={
          <Search />
        } />

        <Route path='/image-details/:imageID' element={
          <ImageDetils />
        } />

        <Route path='/signin' element={
          <Signin loginMessage={loginMessage} setLoginMessage={setLoginMessage} />
        } />

        <Route path='/signup' element={
          <SignUp loginMessage={loginMessage} setLoginMessage={setLoginMessage} />
        } />
      </Routes>
      <ScrollTopBtn />
    </>
  )
}

export default App
