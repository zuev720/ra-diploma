import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../store/Slices/productsFetchSlice";
import {ProductItem} from "../ProductItem/ProductItem";
import {Preloader} from "../Preloader/Preloader";
import {CategoriesList} from "../CategoriesList/CategoriesList";

export function Catalog() {
    const items = useSelector((state) => state.productsFetch);
    const dispatch = useDispatch();
    const [state, setState] = useState({active: false, offSet: 6});
    const [activeCategory, setActiveCategory] = useState(0);
    const currentUrl = `${process.env.REACT_APP_API_URL}/items`;

    const categoryRequest = async (url) => {
        await dispatch(fetchProducts({dispatch, url}));
    };

    useEffect(() => {
        dispatch(fetchProducts({dispatch, url: currentUrl}));
    }, [dispatch, currentUrl]);

    const handleAddProductButton = async () => {
        if (activeCategory === Number(0)) {
            setState({active: true});
            await dispatch(fetchProducts({
                dispatch,
                url: `${process.env.REACT_APP_API_URL}/items?offset=${state.offSet}`
            }));
            setState({active: false, offSet: state.offSet + 6});
        } else {
            // setState({active: true});
            // await dispatch(fetchProducts({
            //     dispatch,
            //     url: `${process.env.REACT_APP_API_URL}/items?offset=${state.offSet}`
            // }));
            // setState({active: false, offSet: state.offSet + 6});
        }
    };

    return (
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            <CategoriesList
                categoryRequest={categoryRequest}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}/>
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