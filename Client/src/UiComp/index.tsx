import React from 'react'
import { Outlet } from "react-router-dom";
import backgroundImg from '../Images/download.jpg';

const Root = () => {
  return (
    <div style={{
        backgroundImage: `url(${ backgroundImg })`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight:'100vh'
    }}>
        <Outlet/>
    </div>
  )
}

export default Root