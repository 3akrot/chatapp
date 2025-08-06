import {useAuthStore} from "../store/useAuthStore.js";
import {MessageSquare} from 'lucide-react'
import {useState} from "react";
export const SignUp = () => {
    const {formData,setFormDate} = useState({
        fullName:"",
        email:"",
        password:"",
    })
    const {signUpError,authUser,signUp} = useAuthStore();
    const validateForm = ()=>{

    }
    const handleSumbit = (e)=>{

    }
    return (
        <div className={'min-h-screen grid lg:grid-cols-2'}>
        {/*    left side    */}
            <div className={'flex flex-col justify-center items-center p-6 sm:p-12'}>
                <div className={'w-full max-w-md space-y-8'}>
                    {/*logo*/}
                    <div className={'text-center mb-8'}>
                        <div className={'flex flex-col gap-2 items-center group'}>
                            <div className={'size-12 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors'}>
                                <MessageSquare className={"text-primary size-6"}></MessageSquare>
                            </div>
                        </div>
                        <h1 className={'text-2xl font-bold mt-2'}>Create Account</h1>
                        <p className={'text-base-content/60'}>Get Started With Your Free Accont</p>
                    </div>
                    <form onSubmit={handleSumbit} className={'space-y-6'}>

                    </form>
                </div>
            </div>
        </div>
    )
}
