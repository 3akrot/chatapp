
import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import cors from 'cors'
import { connectDB } from './lib/db.js';
import {app,server} from './lib/socket.js'
const PORT = process.env.PORT || 5001;
import cookieParser from 'cookie-parser'
import path from 'path'

const __dirname=path.resolve()
console.log(__dirname)
app.use(express.json({limit: '10mb'}));
if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("*",(req,res)=>{
       res.sendFile(path.join(__dirname,'../frontend','dist','index.html'))
    })
}

app.use(cookieParser())
//this remove the cors error
app.use(cors({
    origin:["http://localhost:5173",'http://192.168.1.4:5173'],
    credentials:true,}))

app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoutes)

server.listen(PORT, () => {
  connectDB();
});
//ensure a correct shutdown 
process.on('SIGINT', async () => {
  await server.close()
  process.exit(0)
})