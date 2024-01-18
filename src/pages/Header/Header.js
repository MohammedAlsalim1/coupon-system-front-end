import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../Store/auth-slice";
import './Header.css'
import {Link, NavLink, useNavigate} from "react-router-dom";
import {userNameActions} from "../../Store/username";

const Header = () => {

    const dispatch = useDispatch()
    const selector = useSelector(state => state.getUserName.username);

    const handleLogout = () => {
        dispatch(authActions.logout())
    };

    return (
        <header className="header">
            <h1>
                <Link to='home' className="coupon-system">Coupon System</Link>
            </h1>
            <h2> Welcome back {selector}!</h2>
            <nav>
                <ul>
                    <li>
                        <Link to='/my-coupons' className="label">My Coupons</Link>
                    </li>
                    <li>
                        <Link to='/my-profile' className="label">My Profile</Link>
                    </li>
                    <li>
                        <button onClick={() => dispatch(handleLogout)}>Logout</button>
                    </li>
                </ul>
            </nav>
        </header>

    );
};

export default Header;