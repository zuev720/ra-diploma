import {createSlice} from '@reduxjs/toolkit';

const initialState = false;

export const activateSearchFormReducer = createSlice({
    name: 'activateSearchForm',
    initialState,
    reducers: {
        activateSearchForm(state, action) {
            return action.payload;
        },
    },
});

export const {activateSearchForm} = activateSearchFormReducer.actions;

export default activateSearchFormReducer.reducer;