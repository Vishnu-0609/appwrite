// import React,{ useState,useEffect } from "react"
// import { useDispatch } from 'react-redux'
// import appwriteobj from "./appwrite/auth";
// import { login,logout } from "./store/authSlice";
// import { Footer } from "./components";
// import { Header} from "./components";
// import {Outlet} from 'react-router-dom';

import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import appwriteobj from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading,setloading]=useState(true);
  const dispatch=useDispatch();

  useEffect(()=>
  {
    appwriteobj.getCurrentUser()
    .then((userData)=>{  
      if(userData)
      {
        dispatch(login({userData}));
      }
      else
      {
        dispatch(logout());
      }
    })
    .finally(()=>setloading(false))
  },[])
  
  return !loading ? (
    <div className="bg-gray-400 max-h-screen flex flex-wrap content-between">
      <div className="w-full block">
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
