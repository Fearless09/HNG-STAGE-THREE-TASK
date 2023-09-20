import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signin from './page/Signin'
import SignUp from './page/SignUp'
import Search from './page/Search'
import ImageGallery from './page/ImageGallery'

function App() {

  return (
    <>
      <Routes>
        <Route index element={
          <ImageGallery />
        } />

        <Route path='/search/:tag' element={
          <Search />
        } />

        <Route path='/signin' element={
          <Signin />
        } />

        <Route path='/signup' element={
          <SignUp />
        } />
      </Routes>
    </>
  )
}

export default App
