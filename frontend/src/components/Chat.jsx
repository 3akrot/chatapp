import {  useRef, useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import {Send, MoreVertical, Paperclip, ImageIcon, XSquare} from "lucide-react";
import {useAuthStore} from "../store/useAuthStore.js";
import {ChatMessagecomponent} from "./ChatMessagecomponent.jsx";
import {Cancel} from "axios";
import {MessageInput} from "./MessageInput.jsx";
import {MessageSkelton} from "./MessageSkelton.jsx";

export const ChatComponent = () => {

    const {authUser} = useAuthStore()
    const messagesEndRef = useRef(null);
    const {
        setSelectedUser,
        selectedUser,
        messages, 
        isgettingUserMessages,
        getMessages,
        subscribe,
        unsubscribe,
        
    } = useChatStore();

    const {onlineUsers} = useAuthStore()
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // inside ChatComponent

// 1) Fetch when selected user changes (not just once)
    useEffect(() => {
        if (!selectedUser?._id) return;
        getMessages(selectedUser._id);
        subscribe()
        return ()=>{
            console.log("unsubscriped")
            unsubscribe()
        }
    }, [selectedUser?._id,getMessages,subscribe,unsubscribe]);

// 2) Scroll after messages are rendered
    useEffect(() => {
        if (isgettingUserMessages) return; // wait until loading finishes
        // Ensures it runs after DOM paint
        requestAnimationFrame(scrollToBottom);
    }, [messages, isgettingUserMessages]);




    return (
        <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-base-300 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img
                                src={selectedUser.profilePic || "/avatar.png"}
                                alt={selectedUser.fullName}
                            />
                        </div>
                    </div>
                    <div className="ml-3">
                        <div className="font-medium">{selectedUser.fullName}</div>
                        <div className="text-sm text-base-content/70">
                            {onlineUsers.includes(selectedUser._id)  ? "Online" : "Offline"}
                        </div>
                    </div>
                </div>
                <button onClick={()=>{
                    setSelectedUser(null);
                }} className="btn btn-ghost btn-sm">
                    <XSquare></XSquare>
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {isgettingUserMessages ? (
                    <MessageSkelton></MessageSkelton>
                ) : (
                    <>
                        {messages.map((message) => (
                            <ChatMessagecomponent key={message._id} {...{...message,authUser,selectedUser}} />
                        ))}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            <MessageInput></MessageInput>
        </div>
    );
};