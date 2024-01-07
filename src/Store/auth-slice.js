import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {token: localStorage.getItem('token')},
    reducers: {
        login(state, action) {
            const token = action.payload;
            localStorage.setItem('token', token)
            state.token = token
        },
        logout(state) {
            localStorage.removeItem('token')
            state.token = undefined
        },
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer