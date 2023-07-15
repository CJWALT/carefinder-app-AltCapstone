import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../../components/navbar/NavBar'

function Layouts() {
  return (
    <div className="layout">
      <NavBar /> `
      <Outlet />
    </div>
  )
}

export default Layouts