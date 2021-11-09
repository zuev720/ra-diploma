import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../store/Slices/productsFetchSlice";
import {ProductItem} from "../ProductItem/ProductItem";
import {Preloader} from "../Preloader/Preloader";
import {CategoriesList} from "../CategoriesList/CategoriesList";
import {CatalogSearchForm} from "../CatalogPage/CatalogSearchForm";
import {setCurrentUrl} from "../../store/Slices/currentUrlSlice";
import {nanoid} from "nanoid";

export function Catalog(props) {
    const catalogSearchValue = useSelector((state) => state.valueCatalogSearchForm);
    const currentUrl = useSelector((state) => state.currentUrl);
    const activeCategory = useSelector((state) => state.activeCategory);
    const items = useSelector((state) => state.productsFetch);
    const [offSet, setOffSet] = useState(6);
    const dispatch = useDispatch();

    useEffect(() => {
        if (catalogSearchValue) dispatch(setCurrentUrl(`${process.env.REACT_APP_API_URL}/items?q=${catalogSearchValue}`));
        dispatch(fetchProducts({dispatch, currentUrl, activeCategory}));
    }, [activeCategory, dispatch, currentUrl, catalogSearchValue]);

    const handleAddProductButton = () => {
        (activeCategory === Number(0)
            ? dispatch(setCurrentUrl(`${process.env.REACT_APP_API_URL}/items?offset=${offSet}`))
            : dispatch(setCurrentUrl(`${process.env.REACT_APP_API_URL}/items?categoryId=${activeCategory}&offset=${offSet}`)));
        setOffSet(offSet + 6);
    };

    return (
        <section className="catalog container">
            <h2 className="text-center">Каталог</h2>
            <CatalogSearchForm searchFormValue={props.searchFormValue}/>
            <CategoriesList setOffSet={setOffSet}/>
            <div className="row">
                {(activeCategory === 0 && items.items.length === 0 && <Preloader/>) || (activeCategory !== items.currentCategory && items.loading && <Preloader/>)}
                {items.items.length > 0
                && activeCategory === items.currentCategory
                && items.items.map((item) => <ProductItem key={nanoid()} class={'card catalog-item-card'} {...item}/>)}
                {items.additionalLoading && items.items.length > 0 && <Preloader />}
            </div>
            {items.canAddProducts && <div className="text-center mt-3">
                <button className="btn btn-outline-primary" onClick={handleAddProductButton}>Загрузить ещё</button>
            </div>}
        </section>
    )
}