import {createSlice} from '@reduxjs/toolkit';

const initialState = `${process.env.REACT_APP_API_URL}/items`;

export const currentUrlReducer = createSlice({
    name: 'currentUrl',
    initialState,
    reducers: {
        setCurrentUrl(state, action) {
            return action.payload;
        },
    },
});

export const {setCurrentUrl} = currentUrlReducer.actions;

export default currentUrlReducer.reducer;