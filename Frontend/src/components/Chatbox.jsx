import React, { useEffect, useState , useRef} from 'react'
import { Socket } from 'socket.io-client'
import io from 'socket.io-client'
import '../index.css'

function Chatbox({uname,uroom,socket}) {
    
    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList,setMessageList] = useState([]);

    const sendMessage = async()=>{
      const MessageData = {
        id:Math.random(),
        room:uroom,
        author:uname,
        message:currentMessage,
        time:new Date(Date.now()).getHours()%12 + ":" + new Date(Date.now()).getMinutes()%60,
      }
      await socket.emit("send_message",MessageData);
      setMessageList((list)=>[...list,MessageData])
      setCurrentMessage('')
    }

    useEffect(()=>{
      const handleRecieveMessage = (data) => {setMessageList((list)=>[...list,data]);}
      socket.on("recive_message",handleRecieveMessage)
      return()=>{
        socket.off("recive_message",handleRecieveMessage);
      }
    },[socket])

    const containRef = useRef(null)
    useEffect(()=>{
        containRef.current.scrollTop = containRef.current.scrollHeight
    },[messageList])

  return (
    <>
    <h1 id='user' className='text-center text-red-600 font-semibold text-4xl' style={{fontFamily: "Lilita One",fontweight:"400"}}>Welcome {uname}</h1>
    <div className='p-5 flex items-center justify-center'>
      
      <div className='container w-[400px] backdrop-blur-sm relative h-[600px] border-2 border-white rounded-md'style={{boxShadow:'-5px -5px 5px blue, 3px 3px 5px red'}}>
      
      <div id="HH" ref={containRef} style={{overflowY:"auto", height:"550px"}}>
      {messageList.map((v,i)=>{
        return(
          <div key={v.id} className= {`text-cyan-500 space-y-5 ${(v.author === uname) ? 'text-right text-green-500' : 'text-left' }`}>
            <div className='inline-block my-3'>
              <p className='text-xl inline font-semibold px-2 bg-gray-900 bg-opacity-40 backdrop-blur-lg'>{v.message}</p>
              <p className='text-red-500 bg-gray-900 bg-opacity-40 backdrop-blur-lg px-2'>Sent by {v.author} at {v.time}'o clock</p>
            </div>
          </div>
        )
      })}
      </div>



      <span className='w-full absolute bottom-0'>
        <input onKeyPress={(e)=>{e.key==="Enter" && sendMessage()}} required value={currentMessage} onChange={(e)=>setCurrentMessage(e.target.value)} placeholder='Enter Your Messsage' className='p-2.5 kk w-[80%] text-black'/>
        <button onClick={sendMessage} className='w-[20%] bg-black text-white p-2.5'>Send</button>
      </span>

      </div>

    </div>
    </>
  )
}

export default Chatbox
