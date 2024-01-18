import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './My-profile.css';
import {userNameActions} from "../../Store/username"; // Import your CSS file

function MyProfile(props) {
    const authToken = useSelector((state) => state.auth.token);
    const [editedCustomer, setEditedCustomer] = useState({});
    const dispatch = useDispatch();

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
            setEditedCustomer(data);
            dispatch(userNameActions.setUsername(data.firstName))
        } catch (error) {
        }
    };

    const handleSave = (event) => {
        event.preventDefault();
        fetch('http://localhost:9090/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${authToken}`,
            },
            body: JSON.stringify(editedCustomer),
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                dispatch(userNameActions.setUsername(data.firstName))
                return data;
            })
            .catch((error) => {
                console.error('Error updating customer data:', error);
            });
    };

    useEffect(() => {
        fetchData().then();
    }, [authToken]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditedCustomer({
            ...editedCustomer,
            [name]: value,
        });
    };

    return (
        <div>

            <div className={"my-profile-body"}>
                <form>
                    <div className="profile-details">
                        <div className="input-group">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={editedCustomer.firstName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={editedCustomer.lastName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={editedCustomer.email}
                            />
                        </div>
                        <button onClick={handleSave} type={"submit"}>Save</button>
                    </div>
                </form>
            </div>
        </div>


    );
}

export default MyProfile;
