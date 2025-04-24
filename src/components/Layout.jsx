import React from 'react'
import Header from './header'
import Footer from './footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
   <>
        <Header/>
        <div className="main-content">
            {/* This is where the main content will go */}
            <Outlet/>
        </div>
        <Footer/>
   </>
  )
}

export default Layout