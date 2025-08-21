import axios  from "axios";
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore'
import toast from 'react-hot-toast'
export const axiosInstance = axios.create({baseURL:'http://localhost:5001/api'})
axiosInstance.interceptors.request.use((req)=>{
    req.headers.Authorization=`Bearer ${sessionStorage.getItem('token')}`
    return req;
})
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status
        if (status === 401 || status === 403) {
            // Clear client state so UI reacts immediately
            useAuthStore.setState({ authUser: null })
            useChatStore.setState({
                messages: [],
                users: [],
                selectedUser: null,
                isgettingUsers: false,
                isgettingUserMessages: false,
            })
            toast.error('Session expired. Please log in again.')
        }
        return Promise.reject(error)
    }
)