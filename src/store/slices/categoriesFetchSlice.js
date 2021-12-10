import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk(
    'fetch/categoriesFetch',
    async (props) => {
        const dispatch = props.dispatch;
        dispatch(fetchCategoriesRequest());
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });
            if (!response.ok) {
                dispatch(fetchCategoriesFailure(response.statusText));
            }
            const data = await response.json();
            dispatch(fetchCategoriesSuccess(data));
        } catch (e) {
            dispatch(fetchCategoriesFailure(e.message));
        }
    });


const initialState = {
    items: [], loading: false, error: null,
};

export const categoriesFetchReducer = createSlice({
    name: 'categoriesFetch',
    initialState,
    reducers: {
        fetchCategoriesRequest(state) {
            state.loading = true;
        },
        fetchCategoriesFailure(state, action) {
            state.error = action.payload.error;
            state.loading = false;
        },
        fetchCategoriesSuccess(state, action) {
            state.items = action.payload;
            state.loading = false;
        },
    },
});

export const {fetchCategoriesRequest, fetchCategoriesFailure, fetchCategoriesSuccess} = categoriesFetchReducer.actions;

export default categoriesFetchReducer.reducer;