import {combineReducers, configureStore} from '@reduxjs/toolkit';
import topSalesFetchReducer from "./Slices/topSalesFetchSlice";
import productsFetchReducer from "./Slices/productsFetchSlice";
import productFetchReducer from "./Slices/productFetchSlice";
import categoriesFetchReducer from "./Slices/categoriesFetchSlice";
import activateSearchFormReducer from "./Slices/activateSearchFormSlice";
import valueSearchFormReducer from "./Slices/valueSearchFormSlice";
import valueCatalogSearchFormReducer from "./Slices/valueCatalogSearchFormSlice";
import currentUrlReducer from "./Slices/currentUrlSlice";
import getOrdersReducer from "./Slices/getOrdersSlice";
import requestOrdersReducer from "./Slices/orderRequestSlice";
import activeCategoryReducer from "./Slices/activeCategorySlice";

const rootReducer = combineReducers({
    topSalesFetch: topSalesFetchReducer,
    productsFetch: productsFetchReducer,
    productFetch: productFetchReducer,
    categoriesFetch: categoriesFetchReducer,
    activeCategory: activeCategoryReducer,
    activateSearchForm: activateSearchFormReducer,
    valueSearchForm: valueSearchFormReducer,
    valueCatalogSearchForm: valueCatalogSearchFormReducer,
    currentUrl: currentUrlReducer,
    getOrders: getOrdersReducer,
    requestOrders: requestOrdersReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});