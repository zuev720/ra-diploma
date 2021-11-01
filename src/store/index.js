import {combineReducers, configureStore} from '@reduxjs/toolkit';
import topSalesFetchReducer from "./Slices/topSalesFetchSlice";
import productsFetchReducer from "./Slices/productsFetchSlice";
import productFetchReducer from "./Slices/productFetchSlice";
import categoriesFetchReducer from "./Slices/categoriesFetchSlice";
import activateSearchFormReducer from "./Slices/activateSearchFormSlice";
import valueSearchFormReducer from "./Slices/valueSearchFormSlice";
import valueCatalogSearchFormReducer from "./Slices/valueCatalogSearchFormSlice";
import currentUrlReducer from "./Slices/currentUrlSlice";

const rootReducer = combineReducers({
    topSalesFetch: topSalesFetchReducer,
    productsFetch: productsFetchReducer,
    productFetch: productFetchReducer,
    categoriesFetch: categoriesFetchReducer,
    activateSearchForm: activateSearchFormReducer,
    valueSearchForm: valueSearchFormReducer,
    valueCatalogSearchForm: valueCatalogSearchFormReducer,
    currentUrl: currentUrlReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});