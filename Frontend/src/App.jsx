import { useState } from 'react'
import './App.css'
import io from 'socket.io-client'
import Home from './components/Home'
import Chatbox from './components/Chatbox'


function App() {

  const socket = io.connect("https://chatapp-1-tl6x.onrender.com")
  
  return (
    <>
     <Home/>
    </>
  )
}

export default App
