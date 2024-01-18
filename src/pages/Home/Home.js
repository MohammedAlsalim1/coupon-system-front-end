import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './Home.css'
import {Link, useNavigate} from "react-router-dom";
import {idActions} from "../../Store/coupon-slice";


function Home(props) {
    const [coupons, setCoupons] = useState([]);
    const authToken = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };

            const requestOptions = {
                method: 'GET',
                headers: headers,
            };

            const response = await fetch('http://localhost:9090/coupons', requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setCoupons(data);


        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        fetchData().then();
    },); // Run this effect whenever the authToken changes

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

    const handleCoupon = (id) => {
        dispatch(idActions.setCoupon(id))
        navigate(`/coupon/${id}`)
    };
    return (
        <div>
            <div className="coupon-container">
                {coupons.map((coupon) => (
                    <div key={coupon.id} className="coupon-card">
                        <Link to={`/coupon/${coupon.id}`} onClick={() => handleCoupon(coupon.id)}>
                            <img src={coupon.image} alt={coupon.title} />
                        </Link>
                        <h3>{coupon.title}</h3>
                        <p>Category: {coupon.category}</p>
                        <p>Description: {coupon.description}</p>
                        <p>Start Date: {coupon.startDate}</p>
                        <p>End Date: {coupon.endDate}</p>
                        <p>Amount: {coupon.amount}</p>
                        <p>Price: {coupon.price}</p>
                        <button onClick={() => handlePurchase(coupon.id)}>Purchase</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;