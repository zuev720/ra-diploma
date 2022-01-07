import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../store/slices/productsFetchSlice";
import {ProductItem} from "../ProductItem/ProductItem";
import {Preloader} from "../Preloader/Preloader";
import {CategoriesList} from "../CategoriesList/CategoriesList";
import {CatalogSearchForm} from "../CatalogPage/CatalogSearchForm";
import {useHistory, useLocation} from "react-router-dom";
import qs from "qs";


export function Catalog() {
    const history = useHistory();
    const location = useLocation();
    const items = useSelector((state) => state.productsFetch);
    const {categoryId, offset, q} = qs.parse(location.search.substr(1));
    const [activeCategory, setActiveCategory] = useState((categoryId) ? categoryId : Number(0));
    const [stepOff, setStepOff] = useState(Number(0));
    const dispatch = useDispatch();

    useEffect(() => {
        if (categoryId) setActiveCategory(Number(categoryId));
    }, [categoryId]);

    useEffect(() => {
        if (location.state) {
            setStepOff(Number(0));
        }
        let params = '';
        if (q) params += `?q=${q}`;
        if (activeCategory === 0 && stepOff > 0) {
            if (q) {
                params += `&offset=${stepOff}`;
            } else params += `?offset=${stepOff}`;
        }
        if (activeCategory !== 0 && stepOff === 0) {
            if (q) {
                params += `&categoryId=${activeCategory}`;
            } else params += `?categoryId=${activeCategory}`;
        }
        if (activeCategory !== 0 && stepOff > 0) {
            if (q) {
                params += `&categoryId=${activeCategory}&offset=${stepOff}`;
            } else params += `?categoryId=${activeCategory}&offset=${stepOff}`;
        }

        history.push({
            pathname: location.pathname,
            search: params,
        });
    }, [activeCategory, history, location.pathname, location.state, q, stepOff]);

    useEffect(() => {
        let url = `${process.env.REACT_APP_API_URL}/items`;

        if (!q) {
            if (!categoryId && offset) url += `?offset=${offset}`;
            if (categoryId && !offset) url += `?categoryId=${categoryId}`;
            if (categoryId && offset) url += `?categoryId=${categoryId}&offset=${offset}`;
        } else {
            url += location.search;
        }
        if (items.items.length === 0 && offset) return;
        dispatch(fetchProducts({url, dispatch}));
    }, [categoryId, dispatch, location.search, q]);

    const handleAddProductsButton = () => {
        setStepOff(stepOff + 6);
    };

    return (
        <section className="catalog container">
            <h2 className="text-center">Каталог</h2>
            <CatalogSearchForm/>
            <CategoriesList activeCategory={activeCategory} setActiveCategory={setActiveCategory}
                            setStepOff={setStepOff}/>
            <div className="row w-100">
                {items.loading && <Preloader/>}
                {!items.loading && items.items.map((item) => <ProductItem key={item.id}
                                                                          class={'card catalog-item-card'} {...item}/>)}
                {items.complementaryLoading && stepOff !== 0 && <Preloader/>}
            </div>
            {items.canAddProducts && <div className="text-center mt-3">
                <button className="btn btn-outline-primary" onClick={handleAddProductsButton}>Загрузить ещё</button>
            </div>}
        </section>
    )
}