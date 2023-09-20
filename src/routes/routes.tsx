import { Routes, Route } from "react-router-dom";
import Home from "../screens/home/home";
import Profile from "../screens/profile/profile";

function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/profile" element={<Profile/>} />
        </Routes>
    )
}

export default AppRoutes;