import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import ResNavbar from './ResNavbar'

const Restaurant = () => {
  return (
    <>
     <div>
      
     </div>

      <Routes>
        <Route path='/' element={<ResNavbar/>} />
      </Routes>
    </>
  )
}

export default Restaurant