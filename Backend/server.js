import path from 'path'
import express from 'express'
import cors from 'cors' // cross-origin resource system..
import { Server } from 'socket.io'
import http from 'http'
import mongoose from 'mongoose'
import bodyParser from 'express'
import 'dotenv/config'

const app = express();

app.use(express.static(path.join(path.resolve(),'public')));
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173/',
    credentials:true,
    methods:['GET','PUT','DELETE','POST']
}))

const SS = http.createServer(app);
SS.listen(1000,()=>console.log('Serve is running on port 1000'));

const io = new Server(SS,{cors:{origin:true, credentials:true, methods:['PUT','GET']}});

io.on("connection",(sock)=>{console.log("Socket ID : ",sock.id)

    sock.on("join_room",(data)=>{
        sock.join(data);
        console.log(`User Id : ${sock.id} joined room ${data}`)
    })

    sock.on("send_message",(data)=>{console.log('Send Message Data',data)
    sock.to(data.room).emit("recive_message",data)

    });

    sock.on("disconnect",()=>console.log("User Disconnected",sock.id))

});

