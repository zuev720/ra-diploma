import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchTopSales = createAsyncThunk(
    'fetch/topSalesFetch',
    async (dispatch) => {
        dispatch(fetchTopSalesRequest());
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/top-sales`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });
            if (!response.ok) {
                dispatch(fetchTopSalesFailure(response.statusText));
            }
            const data = await response.json();
            dispatch(fetchTopSalesSuccess(data));
        } catch (e) {
            dispatch(fetchTopSalesFailure(e.message));
        }
    });


const initialState = {
    items: [], loading: false, error: null,
};

export const topSalesFetchReducer = createSlice({
    name: 'topSalesFetch',
    initialState,
    reducers: {
        fetchTopSalesRequest(state) {
            state.loading = true;
        },
        fetchTopSalesFailure(state, action) {
            state.error = action.payload.error;
            state.loading = false;
        },
        fetchTopSalesSuccess(state, action) {
            state.items = action.payload;
            state.loading = false;
        },
    },
});

export const {fetchTopSalesRequest, fetchTopSalesFailure, fetchTopSalesSuccess} = topSalesFetchReducer.actions;

export default topSalesFetchReducer.reducer;