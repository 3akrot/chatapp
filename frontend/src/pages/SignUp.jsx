import {useAuthStore} from "../store/useAuthStore.js";
import {MessageSquare, User, Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft} from 'lucide-react'
import Background from "../components/Background.jsx";
import{Link} from 'react-router-dom'
import {useState} from "react";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import toast from "react-hot-toast";
export const SignUp = () => {
    const [formData,setFormData] = useState({
        fullName:"",
        email:"",
        password:"",
    })
    const {signUpError,authUser,signUp,isSigningUp} = useAuthStore();
    const [showPassword,setshowPassword] = useState(false)
    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

        return true;
    };
    console.log(authUser)
    if(signUpError){
        toast(signUpError)
        console.log(signUpError)
    }
    console.log(signUpError)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = validateForm();

        if (success === true) signUp(formData);
    };

    return (

        <div className={'min-h-screen relative grid lg:grid-cols-2'}>

            {/*    left side    */}
            <div className={'flex flex-col justify-center items-center p-6 sm:p-12'}>
                <div className={'w-full pt-10 max-w-sm space-y-8'}>
                    {/* Back to Home Link */}
                    <div className={'flex justify-start mb-4'}>
                        <Link to="/" className="btn btn-ghost btn-sm">
                            <ArrowLeft className="size-4 mr-1" />
                            Back to Home
                        </Link>
                    </div>
                    {/*logo*/}
                    <div className={'text-center mb-8'}>
                        <div className={'flex flex-col gap-2 items-center group'}>
                            <div className={'size-12 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors'}>
                                <MessageSquare className={"text-primary size-6"}></MessageSquare>
                            </div>
                        </div>
                        <h1 className={'text-2xl font-bold mt-2'}>Create Account</h1>
                        <p className={'text-base-content/60'}>Get Started With Your Free Account</p>
                    </div>
                    <form onSubmit={handleSubmit} className={'space-y-6 '}>
                        <div className="form-control">
                            <label className="label mb-2">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute z-30 inset-y-0 left-0 pl-3 flex items-center z-1 pointer-events-none">
                                    <User className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type="text"
                                    className={`focus:z-10  input input-bordered w-full pl-10`}
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                        </div>
                            <div className="form-control">
                                <label className="label mb-2">
                                    <span className="label-text font-medium">Email</span>
                                </label>
                                <div className="relative">
                                    <input
                                        autoComplete={'on'}
                                        type="email"
                                        className={`input focus:z-10 input-bordered w-full pl-10`}
                                        placeholder="you@email.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    <div className=" absolute z-20 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="size-5 text-base-content/40" />
                                    </div>

                                </div>
                            </div>
                                <div className="form-control">
                                    <label className="label mb-2">
                                        <span className="label-text font-medium">Password</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute z-20 inset-y-0 left-0 pl-3 flex items-center  pointer-events-none">
                                            <Lock className="size-5 text-base-content/40" />
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className={`focus:z-10  input input-bordered w-full pl-10`}
                                            placeholder="Your Password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                        <button type={"button"} className={'absolute inset-y-0 right-3 cursor-pointer z-20 pl-3 flex items-center'} onClick={()=>setshowPassword(!showPassword)}>

                                            {showPassword ? <EyeOff className={'size-5 text-base-content/40'}/> : <Eye className={'size-5 text-base-content/40'}/>}</button>
                                    </div>

                                </div>
                        <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
                            {isSigningUp ? (
                                <>
                                    <Loader2 className="size-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>

                    </form>
                    <div className="text-center">
                        <p className="text-sm text-base-content/60">
                            Already have an account?{" "}
                            <Link to="/login" className="link link-primary">
                                Sign in
                            </Link>
                        </p>
                    </div>

                </div>
            </div>

            <AuthImagePattern         title="Join our community"
                                      subtitle="Connect with friends, share moments, and stay in touch with your loved ones."></AuthImagePattern>


        </div>
    )
}
