import {create} from 'zustand'
import {axiosInstance} from "../lib/axios.js";
import toast  from "react-hot-toast";
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
            console.log(e.response.data.message)
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
            console.log("Error sending message",e.message)
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
            console.log(e.response.message)
        }
        finally {
            set({isgettingUserMessages:false})
        }
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