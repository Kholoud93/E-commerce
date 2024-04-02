import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import { UserContext } from '../../context/UserContext';
import { Offline } from "react-detect-offline";

export default function Layout() {
  let {setUserToken} =useContext(UserContext);

  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null){
    setUserToken(localStorage.getItem('userToken'))
    }
  
  },[])
 

  return (
    <div>
      <Navbar/>
      <div className="container">
  
    <Outlet/>
      </div>
      <div>
   <div className="network">
    <Offline><i className='fas fa-wifi'></i>you're offline(surprise!)</Offline>

   </div>
  </div>
    </div>
  )
}
