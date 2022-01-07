import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import qs from "qs";

export const fetchProducts = createAsyncThunk(
    'fetch/productsFetch',
    async (props) => {
        const url = props.url;
        const {offset} = qs.parse(url, { delimiter: /[?&]/ });
        const dispatch = props.dispatch;
        (offset) ? dispatch(fetchComplementaryProductsRequest()) : dispatch(fetchProductsRequest());
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });
            if (!response.ok) {
                dispatch(fetchProductsFailure(response.statusText));
            }
            const data = await response.json();
            (offset) ? dispatch(fetchComplementaryProductsSuccess(data)) : dispatch(fetchProductsSuccess(data));
        } catch (e) {
            dispatch(fetchProductsFailure(e.message));
        }
    });

const initialState = {
    items: [], complementaryLoading: false, canAddProducts: true, loading: false, error: null,
};

export const productsFetchReducer = createSlice({
    name: 'topSalesFetch',
    initialState,
    reducers: {
        fetchProductsRequest(state) {
            state.loading = true;
        },
        fetchComplementaryProductsRequest(state) {
            state.complementaryLoading = true;
        },
        fetchProductsFailure(state, action) {
            state.error = action.payload.error;
            state.loading = false;
        },
        fetchProductsSuccess(state, action) {
            if (state.canAddProducts === false) state.canAddProducts = true;
            if (action.payload.length < 6) state.canAddProducts = false;
            state.items = action.payload;
            state.loading = false;
        },
        fetchComplementaryProductsSuccess(state, action) {
            if (action.payload.length < 6) state.canAddProducts = false;
            state.items = state.items.concat(action.payload);
            state.complementaryLoading = false;
        },
    },
});

export const {fetchProductsRequest, fetchComplementaryProductsRequest, fetchProductsFailure, fetchProductsSuccess, fetchComplementaryProductsSuccess} = productsFetchReducer.actions;

export default productsFetchReducer.reducer;