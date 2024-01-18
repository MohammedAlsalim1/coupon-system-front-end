import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {userNameActions} from "../../Store/username";

function Customer() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState(null);
    const authToken = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const register = async (firstName, lastName, setError) => {
        try {
            const response = await fetch('http://localhost:9090/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${authToken}`,
                },
                body: JSON.stringify({firstName, lastName}),
            });

            if (response.ok) {

                const data = await response.json();
                return data;
            } else {
                throw new Error('Sign up failed');
            }
        } catch (error) {
            setError('Sign up failed. Please check your credentials.');
            return undefined;
        }
    };
    const fetchData = async () => {
        try {
            if (!authToken) {
                throw new Error('No authentication token available');
            }

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `${authToken}`,
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
    const handleSignUp = async (event) => {
        event.preventDefault();
        setError(null);
        const signUpData = await register(firstName, lastName, setError);
        if (signUpData) {
            console.log(`Success`);
            fetchData().then()
            navigate('/home')

        }
    };


    return (
        <div className={"user-body"}>
            <form>
                <label>First Name:</label>
                <input type="text" value={firstName} onChange={event => setFirstName(event.target.value)}/>
                <label>Last Name:</label>
                <input type="text" value={lastName} onChange={event => setLastName(event.target.value)}/>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <button onClick={handleSignUp} type={"submit"}>Sign up</button>
            </form>
        </div>);
}

export default Customer;