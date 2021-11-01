import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts, setInitialStateProducts} from "../../store/Slices/productsFetchSlice";
import {ProductItem} from "../ProductItem/ProductItem";
import {Preloader} from "../Preloader/Preloader";
import {CategoriesList} from "../CategoriesList/CategoriesList";
import {CatalogSearchForm} from "../CatalogPage/CatalogSearchForm";
import {setCurrentUrl} from "../../store/Slices/currentUrlSlice";

export function Catalog(props) {
    const catalogSearchValue = useSelector((state) => state.valueCatalogSearchForm);
    const currentUrl = useSelector((state) => state.currentUrl);
    const [activeCategory, setActiveCategory] = useState(0);
    const items = useSelector((state) => state.productsFetch);
    const [state, setState] = useState({active: false, offSet: 6});
    const dispatchForRenewProducts = useDispatch();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatchForRenewProducts(setInitialStateProducts());
    },[dispatchForRenewProducts]);

    useEffect(() => {
        if (catalogSearchValue) dispatch(setCurrentUrl(`${process.env.REACT_APP_API_URL}/items?q=${catalogSearchValue}`));
        dispatch(fetchProducts({dispatch, currentUrl, activeCategory}));
    }, [activeCategory, dispatch, currentUrl, catalogSearchValue]);

    const handleAddProductButton = () => {
        if (activeCategory === Number(0)) {
            setState({...state, active: true});
            dispatch(setCurrentUrl(`${process.env.REACT_APP_API_URL}/items?offset=${state.offSet}`));
            setState({active: false, offSet: state.offSet + 6});
        } else {
            setState({...state, active: true});
            dispatch(setCurrentUrl(`${process.env.REACT_APP_API_URL}/items?categoryId=${activeCategory}&offset=${state.offSet}`));
            setState({active: false, offSet: state.offSet + 6});
        }
    };

    return (
        <section className="catalog container">
            <h2 className="text-center">Каталог</h2>
            <CatalogSearchForm searchFormValue={props.searchFormValue}/>
            <CategoriesList
                dispatch={dispatch}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                setState={setState}
            />
            <div className="row">
                {items.loading && items.items.length === 0 && <Preloader/>}
                {items.items && items.items.map((item) => <ProductItem key={item.id} class={'card catalog-item-card'} {...item}/>)}
                {state.active && <Preloader/>}
            </div>
            {items.canAddProducts && <div className="text-center mt-3">
                <button className="btn btn-outline-primary" onClick={handleAddProductButton}>Загрузить ещё</button>
            </div>}
        </section>
    )
}