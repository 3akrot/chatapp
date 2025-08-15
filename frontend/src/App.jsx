import {Navigate, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home.jsx";
import {Login} from "./pages/Login.jsx";
import {Profile} from "./pages/Profile.jsx";
import {Landing} from "./pages/Landing.jsx";
import {Nav} from "./components/Nav.jsx";
import {SignUp} from "./pages/SignUp.jsx";
import {Setting} from "./pages/Setting.jsx";
import {useAuthStore} from "./store/useAuthStore.js";
import {useEffect} from "react";
import {Toaster} from "react-hot-toast";
import {useThemeStore} from "./store/useThemeStore.js";


function App() {
const {checkAuth,isCheckingAuth,authUser} = useAuthStore();
const {theme} = useThemeStore()

    useEffect(() => {
        checkAuth()
    }, [checkAuth]);
    if(isCheckingAuth){
        return <div data-theme={theme} className={'h-screen flex items-center justify-center'}>
            <span className="loading loading-spinner loading-xl text-primary"></span>
        </div>
    }
  return (
   <div data-theme={theme}>
       {/* Only show Nav for authenticated routes */}
       {<Nav/>}
       <Routes>
           <Route path={'/'} element={authUser ? <Home/> : <Landing/>}></Route>
           <Route path={'/login'} element={!authUser ? <Login/> : <Navigate to={'/'} replace={true}/>}></Route>
           <Route path={'/signup'} element={!authUser ? <SignUp/> : <Navigate to={'/'} replace={true}/>}></Route>
           <Route path={'/settings'} element={<Setting/>}></Route>
           <Route path={'/profile'} element={!authUser ? <Navigate to={'/login'} replace={true}/> : <Profile/>}></Route>
       </Routes>
       <Toaster/>
   </div>
  )
}

export default App
