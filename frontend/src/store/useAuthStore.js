import { create } from "zustand";
import io from "socket.io-client";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useChatStore } from "./useChatStore.js";
const BASE_URL = "http://localhost:5001";
export const socket = io(BASE_URL,{autoConnect:false});



export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  onlineUsers: [],
  connectSocket:()=>{
    const {authUser} = get()
    if(!socket.connected && authUser){
        socket.io.opts.query = {userId:authUser._id}
        socket.connect()
        socket.on("onlineusers",(data)=>{
            set({onlineUsers:data})
        })
    }
  },
  disconnectSocket:()=>{
    if(socket.connected){
        socket.off("onlineusers")
        socket.disconnect()
    }
  },
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("auth/check");
      set({ authUser: res.data });
      get().connectSocket()
    } catch (error) {
        console.log(error.message)
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signUpError: null,
  isSigningUp: false,
  signUp: async (data) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("auth/signup", data);
      if (res.status === 201) {
        set({ authUser: res.data });
        get().connectSocket();
        toast.success("account created");
      } else {
        set({ authUser: null });
        set({ signUpError: res.data.message });
      }
    } catch (e) {
      toast(e.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  logIn: async (data) => {
    try {
      set({ isLoggingIn: true });
      const res = await axiosInstance.post("auth/login", data);
      set({ authUser: res.data });
      get().connectSocket()
      toast.success("logged In");
    } catch (e) {
      toast.error(e.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logOut: async () => {
    try {
      await axiosInstance.post("auth/logout");
      useChatStore.getState().reset()
      set({ authUser: null });
      get().disconnectSocket();
      toast.success("logged out");
    } catch (e) {
      toast.error(e.response.data.message);
    }
  },
  updateProfile: async (data) => {
    try {
      await useAuthStore.getState().checkAuth();
      const res = await axiosInstance.put("auth/update-profile", data);
      toast.success("profile Image updated");
      set({ authUser: res.data});
      console.log(get().authUser)
    } catch (e) {
      toast.error(e.response.data.message);
    }
  },
}));
