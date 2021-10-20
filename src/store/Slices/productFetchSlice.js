import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchProduct = createAsyncThunk(
    'fetch/productsFetch',
    async (props) => {
        const dispatch = props.dispatch;
        dispatch(fetchProductRequest());
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/items/${props.id}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });
            if (!response.ok) {
                dispatch(fetchProductFailure(response.statusText));
            }
            const data = await response.json();
            dispatch(fetchProductSuccess(data));
        } catch (e) {
            dispatch(fetchProductFailure(e.message));
        }
    });


const initialState = {
    item: null, loading: false, error: null,
};

export const productFetchReducer = createSlice({
    name: 'productFetch',
    initialState,
    reducers: {
        fetchProductRequest(state) {
            state.loading = true;
        },
        fetchProductFailure(state, action) {
            state.error = action.payload.error;
            state.loading = false;
        },
        fetchProductSuccess(state, action) {
            state.item = action.payload;
            state.loading = false;
        },
    },
});

export const {fetchProductRequest, fetchProductFailure, fetchProductSuccess} = productFetchReducer.actions;

export default productFetchReducer.reducer;