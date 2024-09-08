import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { Footeer } from './Footer'


export default function Layout() {
  return (
    <div className='parent'>
         <Navbar></Navbar>
        <div className="container ">
        <Outlet></Outlet>
        </div>
        <Footeer></Footeer>
    </div>
  )
}
