import React from 'react'
import { useState } from 'react'
import { Socket } from 'socket.io-client'
import io from 'socket.io-client'
import Chatbox from './Chatbox'


function Home() {

  const socket = io.connect('https://chatapp-1-tl6x.onrender.com')
  
  const [formdata,setformdata]=useState({
    uname:'',
    uroom:'',
  })
  
  let getValue = (e)=>{
    
    let oldData = {...formdata}
    let inputName = e.target.name
    let inputvalue = e.target.value
    oldData[inputName] = inputvalue
    setformdata(oldData);
  }
  

  
      const handleSubmit = () => {
          socket.emit("join_room",formdata.uroom);        
      }

  return (
   
    <div className='p-5'>

   
    
    <div className='h-screen flex flex-col items-center justify-center text-center'>
        <h1 className='text-center text-red-600 font-semibold text-4xl' style={{fontFamily: "Lilita One",fontweight:"100"}}> Welcome to Devil-Anshi - <br/> Your Getway to Hell </h1>
        <div className='backdrop-blur-sm bg-opacity-30 space-y-5 max-w-[500px] mx-auto border-2 border-white rounded-md p-5' style={{boxShadow:'-5px -5px 5px blue, 3px 3px 5px red'}}>
            <h1 className='text-4xl mb-3' style={{fontFamily:"Yuji Mai"}}>Join Chat</h1>
            <input value={formdata.uname} name='uname' onChange={getValue} type='text' required className='p-2.5 w-full border-b-2 rounded-full bg-transparent' placeholder='Enter Your Name'/>
            <input value={formdata.uroom} name='uroom' onChange={getValue} type='text' required className='p-2.5 w-full border-b-2 rounded-full bg-transparent' placeholder='Enter Chat Room'/>
            <a href='#user'>
            <button onClick={handleSubmit} className='w-full text-center p-2.5 border-black rounded-md hover:bg-purple-600 border-2 font-bold bg-purple-500 text-white'>Join</button>
            </a>
        </div>
    </div>
           
    <Chatbox uname={formdata.uname} uroom={formdata.uroom} socket={socket}/>
     
    
    </div>
  )
}

export default Home
