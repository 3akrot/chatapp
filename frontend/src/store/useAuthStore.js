import {create} from 'zustand'
import {axiosInstance} from "../lib/axios.js";

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
            }
        }
        catch (e){
            console.log('error in Check Auth',e.message)
            set({authUser:null})
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
            if(res.status === 200) {
                set({authUser: res.data})
                set({signUpError:null})
            }
            else {
                set({authUser:null})
                set({signUpError:res.data.message})
            }
            set({isSigningUp:false})
        }
        catch (e) {
            console.log("error in sign up",e.message)
        }
    }
}));