import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
    'fetch/productsFetch',
    async (props) => {
        const typeRequest = checkUrl(props.currentUrl);
        const dispatch = props.dispatch;
        const activeCategory = props.activeCategory;
        dispatch(fetchProductsRequest());
        try {
            const response = await fetch(props.currentUrl, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });
            if (!response.ok) {
                dispatch(fetchProductsFailure(response.statusText));
            }
            const data = await response.json();
            const obj = {typeRequest, data, activeCategory};
            dispatch(fetchProductsSuccess(obj));
        } catch (e) {
            dispatch(fetchProductsFailure(e.message));
        }
    });

const initialState = {
    items: [], currentCategory: 0, canAddProducts: true, loading: false, error: null,
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
            state.canAddProducts = (action.payload.data.length >= 6);
            if (action.payload.typeRequest === 'allProductsRequest') state.items = action.payload.data;
            if (action.payload.typeRequest === 'allProductsOffsetRequest') state.items = state.items.concat(action.payload.data);
            if (action.payload.typeRequest === 'categoryRequest') state.items = action.payload.data;
            if (action.payload.typeRequest === 'categoryProductsOffsetRequest') state.items = state.items.concat(action.payload.data);
            if (action.payload.typeRequest === 'productsSearchRequest') state.items = action.payload.data;
            state.currentCategory = action.payload.activeCategory;
            state.loading = false;
        },
        setInitialStateProducts(state) {
            state.items = [];
        }
    },
});

export const {fetchProductsRequest, fetchProductsFailure, fetchProductsSuccess, setInitialStateProducts} = productsFetchReducer.actions;

export default productsFetchReducer.reducer;

function checkUrl(url) {
    if (url.indexOf('items?categoryId=') !== -1 && url.indexOf('&offset=') !== -1) return 'categoryProductsOffsetRequest';
    if (url.indexOf(`${process.env.REACT_APP_API_URL}/items?q=`) !== -1) return 'productsSearchRequest';
    if (url.indexOf(`${process.env.REACT_APP_API_URL}/items?categoryId=`) !== -1) return 'categoryRequest';
    if (url.indexOf(`${process.env.REACT_APP_API_URL}/items?offset=`) !== -1) return 'allProductsOffsetRequest';
    if (url.indexOf(`${process.env.REACT_APP_API_URL}/items`) !== -1) return 'allProductsRequest';
}