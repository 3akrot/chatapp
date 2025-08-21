import { useChatStore } from "../store/useChatStore.js";
import {Users} from 'lucide-react'
import {useEffect, useState} from "react";
import {SidebarSkelton} from "./SidebarSkelton.jsx";



export const Sidebar = () => {
    const {users,getUsers,isgettingUsers,selectedUser,setSelectedUser,onlineUsers} = useChatStore();
    const [showOnlineOnly,setshowOnlineOnly] = useState(false);
    useEffect(  ()=>{
        (async ()=>{
            await getUsers();


        })()


    },[getUsers])

    const filteredUseres = showOnlineOnly ? users.filter((user) => onlineUsers.includes(user._id)) : users
    if(isgettingUsers){
        return <SidebarSkelton/>;
    }
    return (
        <aside className={'h-full bg-base-300 w-20 lg:w-72 border-r border-base-300 flex flex-col tansition-all duration-300 '}>
            <div className={'w-full border-b-2 border-base-300 p-5 flex items-center justify-center lg:justify-start gap-2'}>
                <Users></Users>
                <span className={'font-medium hidden lg:block'}>Contacts</span>

            </div>
            <div className="overflow-y-auto w-full py-3">
                {filteredUseres.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-100 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-100 ring-1 ring-base-300" : ""}
            `}
                    >
                        <div className="relative mx-auto lg:mx-0">
                            <img
                                src={user.profilePic || "/avatar.png"}
                                alt={user.name}
                                className="size-12 object-cover rounded-full"
                            />
                            {onlineUsers.includes(user._id) && (
                                <span
                                    className="absolute bottom-0 right-0 size-3 bg-green-500
                  rounded-full ring-2 ring-zinc-900"
                                />
                            )}
                        </div>

                        {/* User info - only visible on larger screens */}
                        <div className="hidden lg:block text-left ">
                            <div className="font-medium truncate">{user.fullName}</div>
                            <div className="text-sm text-zinc-400">
                                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                            </div>
                        </div>
                    </button>
                ))}

                {filteredUseres.length === 0 && (
                    <div className="text-center text-zinc-500 py-4">No online users</div>
                )}
            </div>
        </aside>
    )
};