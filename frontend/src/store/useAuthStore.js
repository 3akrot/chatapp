import {create} from 'zustand'
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    authUser:null,
    isCheckingAuth: true,
    checkAuth: async () =>{
        try {
            const res = await axiosInstance.get("auth/check");
            if(res.status === 200){
                set({authUser:res.data})
            }
            else {
                set({authUser:null})
                throw new Error("no auth")
            }
        }
        catch (e){
            console.log('error in Check Auth',e.message)
            set({authUser:null})
            throw new Error("no auth")
        }
        finally {
            set({isCheckingAuth:false})
        }
    },
    signUpError:null,
    isSigningUp:false,
    signUp:async (data)=>{
        try {
            set({isSigningUp:true})
            const res = await axiosInstance.post("auth/signup",data);
            if(res.status === 201) {
                set({authUser: res.data})
                set({signUpError:null})
                toast.success("account created")
            }
            else {
                set({authUser:null})
                set({signUpError:res.data.message})

            }
        }
        catch (e) {
            toast(e.response.data.message)

        }
        finally {
            set({isSigningUp:false})

        }
    }
    ,
    logIn:async (data)=>{
        try{
            set({isLoggingIn:true})
             const res = await axiosInstance.post('auth/login',data)
                set({authUser:res.data})
            toast.success("logged In")
        }
        catch (e){
            toast.error(e.response.data.message)
        }
        finally {
            set({isLoggingIn:false})
        }
    },
    logOut:async ()=>{
        try{
            await axiosInstance.post("auth/logout")
            set({authUser:null})
            toast.success("logged out")
        }
        catch (e){
            console.log(e)
            toast.error(e.response.data.message)
        }

    },
    updateProfile:async (data)=>{
        try {
            await useAuthStore.getState().checkAuth()
            await axiosInstance.put("auth/update-profile",data)
            toast.success("profile Image updated")
            set({authUser:{profilePic:data.profilePic}})
        }
        catch (e){
            toast.error(e.response.data.message)
        }
    }
}));