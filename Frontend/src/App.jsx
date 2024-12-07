import { useState } from 'react'
import './App.css'
import io from 'socket.io-client'
import Home from './components/Home'
import Chatbox from './components/Chatbox'


function App() {

  const socket = io.connect("http://localhost:1000")
  
  return (
    <>
     <Home/>
    </>
  )
}

export default App
