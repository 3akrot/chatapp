import axios  from "axios";
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore'
export const axiosInstance = axios.create({baseURL: import.meta.env.MODE === 'production' ? '/api':'http://localhost:5001/api',withCredentials:true})

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
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
        }
        return Promise.reject(error)
    }
)