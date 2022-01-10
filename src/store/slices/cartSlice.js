import {createAction, createSlice} from '@reduxjs/toolkit';


export const changeCart = createAction('changeCart');
const initialState = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];

export const cartReducer = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(changeCart, () => {
                return JSON.parse(localStorage.getItem('orders'));
            })
    }
});

export default cartReducer.reducer;