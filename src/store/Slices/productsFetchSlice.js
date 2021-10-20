import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
    'fetch/productsFetch',
    async (props) => {
        const dispatch = props.dispatch;
        dispatch(fetchProductsRequest());
        try {
            const response = await fetch(props.url, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });
            if (!response.ok) {
                dispatch(fetchProductsFailure(response.statusText));
            }
            const data = await response.json();
            dispatch(fetchProductsSuccess(data));
        } catch (e) {
            dispatch(fetchProductsFailure(e.message));
        }
    });


const initialState = {
    items: [], canAddProducts: true, loading: false, error: null,
};

export const productsFetchReducer = createSlice({
    name: 'topSalesFetch',
    initialState,
    reducers: {
        fetchProductsRequest(state) {
            state.loading = true;
        },
        fetchProductsFailure(state, action) {
            state.error = action.payload.error;
            state.loading = false;
        },
        fetchProductsSuccess(state, action) {
            if (action.payload.length < 6) {
                state.canAddProducts = false;
            }
            state.items = (state.items.length > 0) ? state.items.concat(action.payload) : action.payload;
            state.loading = false;
        },
    },
});

export const {fetchProductsRequest, fetchProductsFailure, fetchProductsSuccess} = productsFetchReducer.actions;

export default productsFetchReducer.reducer;