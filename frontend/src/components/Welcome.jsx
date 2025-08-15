import { MessageCircle } from "lucide-react";

export const WelcomeComponent = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="text-center max-w-md">
                <div className="mb-6">
                    <MessageCircle size={64} className="animate-bounce mx-auto text-primary" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Welcome to ChatApp</h1>
                <p className="text-base-content/70 mb-6">
                    Select a conversation from the sidebar to start chatting with your friends and colleagues.
                </p>
                <div className="space-y-2 text-sm text-base-content/60">
                    <p>💬 Send messages instantly</p>
                    <p>👥 Connect with friends</p>
                    <p>🔒 Secure and private</p>
                </div>
            </div>
        </div>
    );
};