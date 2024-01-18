import {createSlice} from '@reduxjs/toolkit'

const idSlice = createSlice({
    name: 'getCoupon',
    initialState: {id: localStorage.getItem('id')},
    reducers: {
        setCoupon(state, action) {
            const id = action.payload;
            localStorage.setItem('id', id)
            state.id = id
        },
    }
})

export const idActions = idSlice.actions
export default idSlice.reducer
