import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function MainLayout({crrUser,clearUserData}) {
  
  return (
    <div className='mt-5 container-fluid'>
        <Navbar crrUser={crrUser} clearUserData={clearUserData} />
        <div style={{minHeight:"650px",marginBottom:"100px"}}>
          <Outlet/>
        </div>
        <Footer />
    </div>
  )
}
