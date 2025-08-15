import {create} from 'zustand'
import {axiosInstance} from "../lib/axios.js";
import toast  from "react-hot-toast";
export  const useChatStore = create((set)=>({
    messages:[],
    users:[],
    selectedUser:null,
    setSelectedUser:(user)=>{
        set({selectedUser:user})

    },
    isgettingUsers:false,
    isgettingUserMessages:false,
    getUsers:async ()=>{
        let data;
        try {
            set({isgettingUsers:true})
            const res = await axiosInstance.get('/message/users')
            set({users:res.data})
            data = res.data

        }
        catch (e){
            console.log(e.response.data.message)
        }
        finally {
            set({isgettingUsers:false})
            return data;
        }
    },
    getMessages :async (userId) =>{
        try {
            set({isgettingUserMessages:true})
            const req = await axiosInstance.get('message/'+userId)
            set({messages:req.data})
        }
        catch (e){
            toast(e.response.message)
        }
        finally {
            set({isgettingUserMessages:false})
        }
    }

}))