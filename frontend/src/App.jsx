import {Navigate, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home.jsx";
import {Login} from "./pages/Login.jsx";
import {Profile} from "./pages/Profile.jsx";
import {Nav} from "./components/Nav.jsx";
import {SignUp} from "./pages/SignUp.jsx";
import {Setting} from "./pages/Setting.jsx";
import {useAuthStore} from "./store/useAuthStore.js";
import {useEffect} from "react";

function App() {
const {checkAuth,isCheckingAuth,authUser} = useAuthStore();
    useEffect(() => {
        checkAuth()
    }, [checkAuth]);
    if(isCheckingAuth){
        return <div className={'h-screen flex items-center justify-center'}>
            <span className="loading loading-spinner loading-xl text-primary"></span>
        </div>
    }
  return (
   <div >
       <Nav/>
       <Routes>
           <Route path={'/'} element={authUser ? <Home/> : <Navigate to={'/login'} replace={true}/>}></Route>
           <Route path={'/login'} element={<Login/>}></Route>
           <Route path={'/Signup'} element={!authUser ? <SignUp/> : <Navigate to={'/'} replace={true}/>}></Route>
           <Route path={'/Setting'} element={<Setting/>}></Route>
           <Route path={'/Profile'} element={!authUser ? <Navigate to={'/login'} replace={true}/> : <Profile/>}></Route>

       </Routes>
   </div>
  )
}

export default App
