import {createSlice} from '@reduxjs/toolkit';

const initialState = '';

export const valueSearchFormReducer = createSlice({
    name: 'valueSearchForm',
    initialState,
    reducers: {
        setValueSearchForm(state, action) {
            return action.payload;
        },
    },
});

export const {setValueSearchForm} = valueSearchFormReducer.actions;

export default valueSearchFormReducer.reducer;