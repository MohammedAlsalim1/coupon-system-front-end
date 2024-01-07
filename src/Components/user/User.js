import {useState} from 'react';
import {useDispatch} from "react-redux";
import {authActions} from "../store/auth-slice";
import {useNavigate} from "react-router-dom";


const User = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()


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
                const data = await response.text();
                return data;
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
            const response = await fetch('http://localhost:9090/signUP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });

            if (response.ok) {
                const data = await response.text();
                return data;
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
        const loginData = await performLogin(username, password, setError);
        if (loginData) {
            dispatch(authActions.login(loginData.token))
            navigate("/home")
        }
    };
    const handleSignUp = async (event) => {
        event.preventDefault();
        setError(null); // Clear previous errors
        const signUpData = await performSignUp(username, password, setError);
        if (signUpData === '') {
            console.log(`Success`);
        }
    };


    return (
        <form>
            <label>Email:</label>
            <input type="text" value={username} onChange={event => setUsername(event.target.value)}/>
            <label>Password:</label>
            <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <button onClick={handleLogin} type={"submit"}>Login</button>
            <button onClick={handleSignUp} type={"submit"}>Sign up</button>
        </form>

    );
};
export default User