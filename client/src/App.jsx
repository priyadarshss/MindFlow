import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Logo from './assets/logo.png'
import { Home, CreatePost } from './pages'

const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-2 border-b border-b-[#e6ebf4]'>
        <Link to='/'>
          <img src={Logo} alt='logo' className='w-40 object-contain' />
        </Link>
        <Link
          to='/create-post'
          className='font-medium bg-[#ff8606] text-white px-4 py-2 rounded-lg'
        >
          Create
        </Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#dbe0f2] min-h-[calc(100vh-70px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
