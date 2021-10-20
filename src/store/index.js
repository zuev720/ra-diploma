import {combineReducers, configureStore} from '@reduxjs/toolkit';
import topSalesFetchReducer from "./Slices/topSalesFetchSlice";
import productsFetchReducer from "./Slices/productsFetchSlice";
import productFetchReducer from "./Slices/productFetchSlice";
import categoriesFetchReducer from "./Slices/categoriesFetchSlice";
const rootReducer = combineReducers({
    topSalesFetch: topSalesFetchReducer,
    productsFetch: productsFetchReducer,
    productFetch: productFetchReducer,
    categoriesFetch: categoriesFetchReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});