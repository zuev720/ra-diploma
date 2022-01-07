import {combineReducers, configureStore} from '@reduxjs/toolkit';
import topSalesFetchReducer from "./slices/topSalesFetchSlice";
import productsFetchReducer from "./slices/productsFetchSlice";
import productFetchReducer from "./slices/productFetchSlice";
import categoriesFetchReducer from "./slices/categoriesFetchSlice";
import valueSearchFormReducer from "./slices/valueSearchFormSlice";
import requestOrdersReducer from "./slices/orderRequestSlice";
import cartReducer from "./slices/cartSlice";

const rootReducer = combineReducers({
    topSalesFetch: topSalesFetchReducer,
    productsFetch: productsFetchReducer,
    productFetch: productFetchReducer,
    categoriesFetch: categoriesFetchReducer,
    valueSearchForm: valueSearchFormReducer,
    requestOrders: requestOrdersReducer,
    getOrders: cartReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});