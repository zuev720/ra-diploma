import {createSlice} from '@reduxjs/toolkit';

const initialState = '';

export const valueCatalogSearchFormReducer = createSlice({
    name: 'valueCatalogSearchForm',
    initialState,
    reducers: {
        setValueCatalogSearchForm(state, action) {
            return action.payload;
        },
    },
});

export const {setValueCatalogSearchForm} = valueCatalogSearchFormReducer.actions;

export default valueCatalogSearchFormReducer.reducer;