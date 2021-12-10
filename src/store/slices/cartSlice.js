import {createSlice} from '@reduxjs/toolkit';

const initialState = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];

export const cartReducer = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCart() {
            return JSON.parse(localStorage.getItem('orders'));
        },
    },
});

export const {updateCart} = cartReducer.actions;

export default cartReducer.reducer;