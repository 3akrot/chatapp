import { useState, useRef, useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { Send, MoreVertical } from "lucide-react";

export const ChatComponent = () => {
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);
    const { 
        selectedUser, 
        messages, 
        sendMessage, 
        isMessagesLoading 
    } = useChatStore();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            await sendMessage(newMessage);
            setNewMessage("");
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    if (!selectedUser) return null;

    return (
        <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-base-300 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img
                                src={selectedUser.profilePic || "/avatar-placeholder.png"}
                                alt={selectedUser.fullName}
                            />
                        </div>
                    </div>
                    <div className="ml-3">
                        <div className="font-medium">{selectedUser.fullName}</div>
                        <div className="text-sm text-base-content/70">
                            {selectedUser.isOnline ? "Online" : "Offline"}
                        </div>
                    </div>
                </div>
                <button className="btn btn-ghost btn-sm">
                    <MoreVertical size={20} />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {isMessagesLoading ? (
                    <div className="flex items-center justify-center h-32">
                        <span className="loading loading-spinner loading-md"></span>
                    </div>
                ) : (
                    <>
                        {messages.map((message) => (
                            <div
                                key={message._id}
                                className={`flex ${
                                    message.senderId === selectedUser._id ? "justify-start" : "justify-end"
                                }`}
                            >
                                <div
                                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                        message.senderId === selectedUser._id
                                            ? "bg-base-200 text-base-content"
                                            : "bg-primary text-primary-content"
                                    }`}
                                >
                                    <p>{message.text}</p>
                                    <div className="text-xs opacity-70 mt-1">
                                        {new Date(message.createdAt).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-base-300">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="input input-bordered flex-1"
                        disabled={isMessagesLoading}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!newMessage.trim() || isMessagesLoading}
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};