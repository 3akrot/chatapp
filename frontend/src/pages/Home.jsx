import {Sidebar} from "../components/Sidebar";
import {WelcomeComponent} from "../components/Welcome";
import {ChatComponent} from "../components/Chat";
import {useChatStore} from "../store/useChatStore.js";

export const Home = () => {
    const {selectedUser} = useChatStore();

    return (
        <div className={'bg-base-200 h-screen pt-20 flex justify-center items-center'}>
            <div className={'w-full rounded-xl shadow-cl max-w-6xl bg-base-100 h-full flex'}>
                <Sidebar></Sidebar>
                {selectedUser ? <ChatComponent></ChatComponent> : <WelcomeComponent></WelcomeComponent>}

            </div>
        </div>
    )
}
