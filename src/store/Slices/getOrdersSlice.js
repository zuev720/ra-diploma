import {createSlice} from '@reduxjs/toolkit';

const initialState = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];

export const getOrdersReducer = createSlice({
    name: 'getOrders',
    initialState,
    reducers: {
        setOrders(state, action) {
            return action.payload;
        },
    },
});

export const {setOrders} = getOrdersReducer.actions;

export default getOrdersReducer.reducer;