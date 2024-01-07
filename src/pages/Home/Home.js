import React from 'react';
import {useDispatch} from "react-redux";
import {authActions} from "../store/auth-slice";

const Home = () => {

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(authActions.logout())
    };

    return (
        <>
            <h1>Welcome home! You're logged in!</h1>
            <p>Logout here:</p>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
};

export default Home;