import { useChatStore } from "../store/useChatStore.js";
import {Users} from 'lucide-react'
import {useEffect} from "react";

function SidebarSkelton() {
    return null;
}

export const Sidebar = () => {
    const {users,getUsers,isgettingUsers} = useChatStore();
    console.log("useres",users)
    useEffect( ()=>{
         getUsers().then((e)=>{
             console.log(e,"users")
         });

    },[getUsers])
    if(isgettingUsers){
        return <SidebarSkelton/>;
    }
    return (
        <aside className={'h-full bg-base-300 w-20 lg:w-72 border-r border-base-300 flex flex-col tansition-all duration-300 '}>
            <div className={'w-full border-b-2 border-base-300 p-5 flex items-center gap-2'}>
                <Users></Users>
                <span className={'font-medium hidden lg:block'}>Contacts</span>

            </div>
            {isgettingUsers ? <SidebarSkelton/> : users.map((user)=>(
                <p key={user.username}>{user.fullName}</p>
            ))}
        </aside>
    )
};