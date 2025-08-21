import {useState} from "react";
import {useChatStore} from "../store/useChatStore.js";
import {ImageIcon, Send} from "lucide-react";
export const MessageInput = () => {
    const {
        selectedUser,
        isgettingUserMessages,
        sendMessage,
    } = useChatStore();

    const [newMessage, setNewMessage] = useState("");
    const [image,setImageUrl] = useState('')
    const handleSendMessage = async (e) => {
        e.preventDefault();
        try {
            await sendMessage(newMessage,image, selectedUser._id);
            setNewMessage("");
            setImageUrl('')
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };


    async function handleFileChange(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image')) {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onloadend =()=>{
                setImageUrl(reader.result);
            }
        }
    }
    return (
        <div className="p-4 border-t border-base-300">
            <div className={'flex mb-4'}>
                {image && <div className={'relative'}><button onClick={()=>{
                    setImageUrl('')
                }} className={' btn size-6 rounded-full btn-primary btn-sm -right-3 absolute -top-3 p-0'}>x</button> <img className={'object-contain max-w-32'} alt={'image'} src={image} /></div>}
            </div>
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="input input-bordered flex-1"
                    disabled={isgettingUserMessages}
                />
                <label className={'btn px-3 btn-accent'} htmlFor={'file-upload'}>
                    <ImageIcon></ImageIcon>
                    <input id={'file-upload'} className={'hidden'} onChange={handleFileChange} accept={'image/jpeg ,image/gif, image/png'} type={'file'}/>
                </label>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={(!newMessage.trim() && !image) || isgettingUserMessages}
                >
                    <Send size={20} />
                </button>
            </form>
        </div>

    )
}