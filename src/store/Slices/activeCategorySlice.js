import {createSlice} from '@reduxjs/toolkit';

const initialState = 0;

export const activeCategoryReducer = createSlice({
    name: 'activeCategory',
    initialState,
    reducers: {
        setCurrentCategory(state, action) {
            return action.payload;
        },
    },
});

export const {setCurrentCategory} = activeCategoryReducer.actions;

export default activeCategoryReducer.reducer;