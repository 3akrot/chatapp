import http from 'http';
import {Server} from 'socket.io';
import express from "express";
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:["http://localhost:5173",'http://192.168.1.4:5173'],
        credentials:true
    }
});
const usersSocketMap = {}
io.on('connection',(socket)=>{
    const userId = socket.handshake.query.userId;
    if (userId != null && userId !== 'undefined') {
        usersSocketMap[userId] = socket.id;
        io.emit("onlineusers",Object.keys(usersSocketMap))
    }

    socket.on("disconnect",()=>{
        if (userId != null && userId !== 'undefined') {
            delete usersSocketMap[userId];
            io.emit('onlineusers', Object.keys(usersSocketMap));
        }
    });
});
function getUserSocketId(userId){
if(usersSocketMap[userId])
    return usersSocketMap[userId]
}
export {server,io,app,getUserSocketId}
