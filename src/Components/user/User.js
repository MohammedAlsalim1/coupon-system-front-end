import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {authActions} from "../../Store/auth-slice";
import {useNavigate} from "react-router-dom";
import './User.css'
import {userNameActions} from "../../Store/username";

const User = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const fetchData = async (token) => {
        try {
            if (!token) {
                throw new Error('No authentication token available');
            }

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
            };

            const requestOptions = {
                method: 'GET',
                headers: headers,
            };

            const response = await fetch('http://localhost:9090/get-customer', requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            dispatch(userNameActions.setUsername(data.firstName))
        } catch (error) {
            console.log(error)
        }
    };
    const performLogin = async (username, password, setError) => {
        try {
            const response = await fetch('http://localhost:9090/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });

            if (response.ok) {
                return await response.text();
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            return undefined;
        }
    };
    const performSignUp = async (username, password, setError) => {
        try {
            const response = await fetch('http://localhost:9090/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });

            if (response.ok) {

                return await response.text();
            } else {
                throw new Error('Sign up failed');
            }
        } catch (error) {
            setError('Sign up failed. Please check your credentials.');
            return undefined;
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(null); // Clear previous errors
        const token = await performLogin(username, password, setError);
        if (token) {
            dispatch(authActions.login(token))
            fetchData(token);
            navigate("/home")
        }
    };
    const handleSignUp = async (event) => {
        event.preventDefault();
        setError(null); // Clear previous errors
        const signUpData = await performSignUp(username, password, setError);
        const token = await performLogin(username, password, setError);
        if (signUpData === '') {
            dispatch(authActions.login(token))
            dispatch(userNameActions.setUsername(''))
            navigate('/sign-up')
        }
    };


    return (
        <div className={"user-body"}>
            <form>
                <label>Email:</label>
                <input type="text" value={username} onChange={event => setUsername(event.target.value)}/>
                <label>Password:</label>
                <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <button onClick={handleLogin} type={"submit"}>Login</button>
                <button onClick={handleSignUp} type={"submit"}>Sign up</button>

            </form>
        </div>

    )
        ;
};
export default User