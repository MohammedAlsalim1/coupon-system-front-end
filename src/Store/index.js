import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth-slice'
import couponIdReducer from './coupon-slice'
import username from "./username";

const store = configureStore({
    reducer: {
        'auth': authReducer,
        'getCoupon': couponIdReducer,
        'getUserName': username,
    }
});

export default store