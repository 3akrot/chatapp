import {useState} from "react";
import {Camera, Eye, EyeOff, Loader2, Lock, Mail, User} from "lucide-react";
import {useAuthStore} from "../store/useAuthStore.js";
import toast from "react-hot-toast";

export const Profile = () => {
    const {authUser,updateProfile} = useAuthStore()
    const [Photourl,setPhoto] = useState(authUser.profilePic)
    const handleImageSelect = (event)=>{
        const photo = event.target.files[0];
        const reader = new FileReader();
         reader.readAsDataURL(photo);
        reader.onloadend = async (e) => {
            const id = toast.loading("uploading")

            try {
                await updateProfile({profilePic:reader.result});
                setPhoto(reader.result);
            }
            catch (e){
                toast(e.message)
            }
            finally {
                toast.dismiss(id)
            }





        }
    }
    return (
        <div className={'pt-24 min-h-screen gap-3 flex flex-col items-center justify-center'}>
            <div className={'bg-base-300 border-base-300 text-base-content w-full  max-w-2xl rounded-2xl p-5'}>
                <h1 className={'text-center text-2xl font-bold '}>Profile</h1>
                <p className={'text-center text-sm mb-4'} >Your Profile Information</p>
                <div className={'size-24 mx-auto mt-2 relative rounded-full outline-1'}>
                    <div className={'size-24 flex items-center justify-center overflow-hidden rounded-full'}>
                        <img  className={'object-cover'} src={Photourl} />

                    </div>
                    <label className={'cursor-pointer absolute top-9/12 left-8/12'} htmlFor='photo'>
                        <div className={' bg-base-100 flex items-center justify-center p-2 rounded-full'}>
                            <Camera className={'text-neutral'}></Camera>
                        </div>

                        <input accept={'image/jpeg'} id={'photo'} className={'hidden'} onChange={handleImageSelect} type={'file'}/>
                    </label>
                </div>
                <p className={'mt-5 text-sm mb-5 mx-auto  max-w-72 text-center'} >click the camera button to update your photo</p>
                <form  className={'space-y-6 '}>
                    <div className="form-control">
                        <label className="label mb-2">
                            <span className="label-text font-medium">Full Name</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-1 pointer-events-none">
                                <User className="size-5 text-base-content/40" />
                            </div>
                            <input
                                type="text"
                                className={`focus:-z-10  input input-bordered w-full pl-10`}
                                placeholder="John Doe"
                                value={authUser.fullName}
                                readOnly={true}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label mb-2">
                            <span className="label-text font-medium">Email</span>
                        </label>
                        <div className="relative">
                            <input
                                disabled={true}
                                autoComplete={'on'}
                                type="email"
                                className={`input focus:-z-10 input-bordered w-full pl-10`}
                                placeholder="you@email.com"
                                value={authUser.email}
                            />
                            <div className=" absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="size-5 text-base-content/40" />
                            </div>

                        </div>
                    </div>

                </form>

            </div>
            <div className={'bg-base-300 border-base-300 text-base-content w-full  max-w-2xl rounded-2xl p-5'}>
                <h1 className={'text-2xl mb-5 font-bold '}>Account Information</h1>
                <div className={'flex justify-between'}
                >
                    <p className={' text-sm  mb-4'} >Member since</p>
                    <span className={'text-gray-400 text-sm'}>2024</span>

                </div>
                <hr/>
                <div className={'flex mt-4 justify-between'}
                >
                    <p className={' text-sm  mb-4'} >Account Status</p>
                    <span className={'text-gray-400 text-sm'}>Active</span>

                </div>



            </div>

        </div>
    )
}
