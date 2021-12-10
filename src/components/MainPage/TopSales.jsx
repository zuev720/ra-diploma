import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {fetchTopSales} from "../../store/slices/topSalesFetchSlice";
import {Preloader} from "../Preloader/Preloader";
import {ProductItem} from "../ProductItem/ProductItem";

export function TopSales() {
    const topSales = useSelector((state) => state.topSalesFetch);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTopSales(dispatch));
    }, [dispatch]);


    return(
        <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            <div className="row">
                {topSales.loading && <Preloader/>}
                {!topSales.loading && topSales.items && topSales.items.map((item) => <ProductItem
                    key={item.id}
                    class={'card'}
                    {...item}/>)}
            </div>
        </section>
    )
}