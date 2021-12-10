import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../store/slices/productsFetchSlice";
import {ProductItem} from "../ProductItem/ProductItem";
import {Preloader} from "../Preloader/Preloader";
import {CategoriesList} from "../CategoriesList/CategoriesList";
import {CatalogSearchForm} from "../CatalogPage/CatalogSearchForm";
import {useHistory, useLocation} from "react-router-dom";
import {setValueCatalogSearchForm} from "../../store/slices/valueCatalogSearchFormSlice";


export function Catalog() {
    const history = useHistory();
    const location = useLocation();
    const qs = require('qs');
    const items = useSelector((state) => state.productsFetch);
    const [activeCategory, setActiveCategory] = useState(0);
    const [stepOff, setStepOff] = useState(Number(0));
    const dispatch = useDispatch();

    useEffect(() => {
        let params = '';
        const {q} = qs.parse(location.search.substr(1));
        if (activeCategory === 0 && stepOff > 0) params += `?offset=${stepOff}`;
        if (activeCategory !== 0 && stepOff === 0) params += `?categoryId=${activeCategory}`;
        if (activeCategory !== 0 && stepOff > 0) params += `?categoryId=${activeCategory}&offset=${stepOff}`;
        if (q) {
            params += `?q=${q}`;
            dispatch(setValueCatalogSearchForm(q));
        }

        history.push({
            pathname: location.pathname,
            search: params,
        });

    }, [activeCategory, dispatch, history, location.pathname, location.search, qs, stepOff]);

    useEffect(() => {
        const {categoryId, offset, q} = qs.parse(location.search.substr(1));
        let url = `${process.env.REACT_APP_API_URL}/items`;
        if (q) url += `?q=${q}`;
        if (!categoryId && offset) url += `?offset=${offset}`;
        if (categoryId && !offset) url += `?categoryId=${categoryId}`;
        if (categoryId && offset) url += `?categoryId=${categoryId}&offset=${offset}`;
        dispatch(fetchProducts({url, offset, dispatch}));
    }, [dispatch, location.search, qs]);

    const handleAddProductsButton = () => {
        setStepOff(stepOff + 6);
    };

    return (
        <section className="catalog container">
            <h2 className="text-center">Каталог</h2>
            <CatalogSearchForm/>
            <CategoriesList activeCategory={activeCategory} setActiveCategory={setActiveCategory} setStepOff={setStepOff}/>
            <div className="row">
                {items.loading && <Preloader/>}
                {!items.loading && items.items.map((item) => <ProductItem key={item.id} class={'card catalog-item-card'} {...item}/>)}
                {items.complementaryLoading && <Preloader/>}
            </div>
            {items.canAddProducts && <div className="text-center mt-3">
                <button className="btn btn-outline-primary" onClick={handleAddProductsButton}>Загрузить ещё</button>
            </div>}
        </section>
    )
}