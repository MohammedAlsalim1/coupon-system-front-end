import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './my-coupons.css'
import Header from "../Header/Header";

const apiUrl = 'http://localhost:9090/customer-coupons';

const MyCoupons = (props) => {
    const authToken = useSelector((state) => state.auth.token);
    const [coupons, setCoupons] = useState([]);


    const fetchData = async () => {
        try {
            if (!authToken) {
                throw new Error('No authentication token available');
            }

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `${authToken}`,
            };

            const requestOptions = {
                method: 'GET',
                headers: headers,
            };

            const response = await fetch(apiUrl, requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setCoupons(data);  // Set the state with the fetched data

        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        fetchData().then();
    }, ); // Run this effect whenever the authToken changes

    const handleRemove = async (uuid) => {
        const headers = {
            'Content-Type': 'application/json'
        };

        const requestOptions = {
            method: 'DElETE',
            headers: headers,
        };
        const response = await fetch(`http://localhost:9090/delete/${uuid}`, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

    };
    return (
        <div>
        <div className="coupon-container">
            {coupons.map((coupon) => (
                <div key={coupon.id} className="coupon-card">
                    <img src={coupon.image}/>
                    <h3>{coupon.title}</h3>
                    <p>Category: {coupon.category}</p>
                    <p>Description: {coupon.description}</p>
                    <p>Start Date: {coupon.startDate}</p>
                    <p>End Date: {coupon.endDate}</p>
                    <p>Price: ${coupon.price}</p>
                    <button onClick={()=>handleRemove(coupon.id)}>remove</button>
                </div>
            ))}

        </div>
</div>
    );
};

export default MyCoupons;
