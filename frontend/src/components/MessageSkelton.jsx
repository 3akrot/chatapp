export const MessageSkelton = function () {
    return (
        <div className="space-y-4">
            {/* Skeleton for received message */}
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <div className="skeleton w-10 h-10 rounded-full"></div>
                    </div>
                </div>
                <div className="chat-bubble mb-2 ">
                    <div className="skeleton h-4 w-32 mb-2"></div>
                    <div className="skeleton h-4 w-24"></div>
                </div>
                <div className="chat-footer">
                    <div className="skeleton h-3 w-20"></div>
                </div>
            </div>

            {/* Skeleton for sent message */}
            <div className="chat chat-end">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <div className="skeleton w-10 h-10 rounded-full"></div>
                    </div>
                </div>
                <div className="chat-bubble mb-2 ">
                    <div className="skeleton h-4 w-28 mb-2"></div>
                    <div className="skeleton h-4 w-20"></div>
                </div>
                <div className="chat-footer">
                    <div className="skeleton h-3 w-20"></div>
                </div>
            </div>

            {/* Skeleton for received message with image */}
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <div className="skeleton w-10 h-10 rounded-full"></div>
                    </div>
                </div>
                <div className="chat-bubble mb-2">
                    <div className="skeleton h-4 w-52 rounded-lg mb-2"></div>
                    <div className="skeleton h-4 w-24"></div>
                </div>
                <div className="chat-footer">
                    <div className="skeleton h-3 w-20"></div>
                </div>
            </div>
        </div>
    )
}