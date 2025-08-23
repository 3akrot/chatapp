export const ChatMessagecomponent = ({senderId,text,image,createdAt,selectedUser,authUser}) => {
    const send = senderId === authUser._id;
    const userProfile = send ? authUser : selectedUser;

    return (
        <div 
            className={` chat ${send ? "chat-end" : "chat-start"}`}
        >
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={userProfile.profilePic || "/avatar.png"}
                    />
                </div>
            </div>
            <div
                className={`chat-bubble chat-bubble-primary `}
            >     {image &&<div className={'bg-base-300 rounded-lg max-w-72'}><img className={'object-contain h-full w-full'} src={image} alt={"Image"} /></div> }
                <p className={'break-all'}>{text}</p>
            </div>
            <div className="chat-footer">
                {new Date(createdAt).toLocaleTimeString([], {

                    weekday: 'long',
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </div>
        </div>
    )
}
