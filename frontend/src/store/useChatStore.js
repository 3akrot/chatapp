import {create} from 'zustand'
import {axiosInstance} from "../lib/axios.js";
import toast  from "react-hot-toast";
import { socket } from './useAuthStore.js';
export  const useChatStore = create((set,getState)=>({
    messages:[],
    onlineUsers:[],
    users:[],
    selectedUser:null,
    setSelectedUser:(user)=>{
        set({selectedUser:user})

    },
    isgettingUsers:false,
    isgettingUserMessages:false,
    getUsers:async ()=>{
        try {
            set({isgettingUsers:true})
            const res = await axiosInstance.get('/message/users')
            set({users:res.data})

        }
        catch (e){
            console.log(e.message)
        }
        finally {
            set({isgettingUsers:false})
        }
    },
    sendMessage: async (msg,img64,recieverId)=>{
        let toastId;
        try {
            if(img64){
                toastId= toast.loading('uploading')
            }
            const req = await axiosInstance.post('/message/send/' + recieverId, {text:msg,image:img64});
            set({messages:[...getState().messages,{...req.data,image : img64 ? img64 : ''}]})

        }catch (e){
            console.log(e.message)
        }
        finally {
            toast.dismiss(toastId);
        }
    },
    getMessages :async (userId) =>{
        try {
            set({isgettingUserMessages:true})
            const req = await axiosInstance.get('message/'+userId)
            set({messages:req.data})
        }
        catch (e){
            console.log("error getting messages",e.message)
        }
        finally {
            set({isgettingUserMessages:false})
        }
    },
    subscribe:()=>{
        if(!getState().selectedUser) return
        socket.on("message",(message)=>{
            if(getState().selectedUser._id !== message.senderId)
                return
            set({messages:[...getState().messages,message]})
        })
    },
    unsubscribe:()=>{
        socket.off("message")
    },
    // Reset chat state (used on logout)
    reset: () => {
        set({
            messages: [],
            users: [],
            selectedUser: null,
            isgettingUsers: false,
            isgettingUserMessages: false,
        })
    }

}))