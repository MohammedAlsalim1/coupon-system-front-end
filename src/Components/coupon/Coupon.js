import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import Header from "../../pages/Header/Header";
import './Coupon.css'
function Coupon(props) {
    const [coupon, setCoupon] = useState({});
    const couponId = useSelector(state => state.getCoupon.id);
    const authToken = useSelector((state) => state.auth.token);

    const fetchData = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };

            const requestOptions = {
                method: 'GET',
                headers: headers,
            };

            const response = await fetch(`http://localhost:9090/coupon/${couponId}`, requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setCoupon(data);

        } catch (error) {
            console.error('Fetch error:', error);
        }
    };
    const handlePurchase = async (id) => {

        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `${authToken}`,
            };

            const requestOptions = {
                method: 'POST',
                headers: headers,
            };

            const response = await fetch(`http://localhost:9090/purchase-coupon/${id}`, requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        fetchData().then();
    },);
    return (
        <div>
            <div className="coupon-container2">
                <div key={coupon.id} className="coupon-card2">
                    <img src={coupon.image} className="coupon-image"/>
                    <div className="coupon-card2">
                    <h3>{coupon.title}</h3>
                    <p>Category: {coupon.category}</p>
                    <p>Description: {coupon.description}</p>
                    <p>Start Date: {coupon.startDate}</p>
                    <p>End Date: {coupon.endDate}</p>
                    <p>Amount: {coupon.amount}</p>
                    <p>Price: ${coupon.price}</p>
                    <button onClick={() => handlePurchase(coupon.id)}>Purchase</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Coupon;
