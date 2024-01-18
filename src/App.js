import React from "react";
import './App.css';
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import User from "./Components/user/User";
import MyCoupons from "./pages/My-coupons/my-coupons";
import MyProfile from "./pages/My-profile/My-profile";
import Home from "./pages/Home/Home";
import Coupon from "./Components/coupon/Coupon";
import Header from "./pages/Header/Header";
import Customer from "./Components/customer/customer";

function App() {
    const token = useSelector(state => state.auth.token);
    const location = useLocation();
    const isSignUpPage = location.pathname === "/sign-up";

    return (
        <>
            {token && !isSignUpPage && <Header/>}
            <Routes>
                <Route path="/" element={token ? <Navigate to="/home"/> : <Navigate to="/login"/>}/>
                <Route path="/home" element={token ? <Home/> : <Navigate to="/login"/>}/>
                <Route path="/sign-up" element={token ? <Customer/> : <Navigate to="/login"/>}/>
                <Route path="/my-coupons" element={token ? <MyCoupons/> : <Navigate to="/login"/>}/>
                <Route path="/my-profile" element={token ? <MyProfile/> : <Navigate to="/login"/>}/>
                <Route path="/coupon/*" element={token ? <Coupon/> : <Navigate to="/login"/>}/>
                <Route path="/login" element={<User/>}/>
                <Route path="*" element={token ? <Navigate to="/home"/> : <Navigate to="/login"/>}/>
            </Routes>
        </>
    );
}

export default App;
