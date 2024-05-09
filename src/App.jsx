import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home/Home'
import Video from './pages/Video/Video'
import Footer from './components/Footer/Footer'
const App = () => {
  const [sidebar, setSidebar] = useState(true)
  const [category, setCategory] = useState(0)
  const [loading, setLoading] = useState(false)
  return (
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path='/Youtube_Clone/' element={<Home sidebar={sidebar} category={category} setCategory={setCategory} loading={loading} setLoading={setLoading} />} />
        <Route path='/Youtube_Clone/video/:channelId/:categoryId/:videoId' element={<Video sidebar={sidebar} category={category} setCategory={setCategory} loading={loading} setLoading={setLoading} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App