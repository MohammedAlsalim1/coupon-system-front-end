import {createSlice} from '@reduxjs/toolkit'

const userNameSlice = createSlice({
    name: 'getUserName',
    initialState: {username: localStorage.getItem('username')},
    reducers: {
        setUsername(state, action) {
            const username = action.payload;
            localStorage.setItem('username', username)
            state.username = username
        },
    }
})

export const userNameActions = userNameSlice.actions
export default userNameSlice.reducer
