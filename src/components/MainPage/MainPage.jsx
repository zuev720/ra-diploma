import React, {useEffect} from "react";
import {TopSales} from "./TopSales";
import {Catalog} from "./Catalog";
import {useDispatch} from "react-redux";
import {setInitialOrder} from "../../store/slices/orderRequestSlice";
import {useStatusOrder} from "../../hooks/useStatusOrder";

export function MainPage() {
    const statusOrder = useStatusOrder();
    const dispatch = useDispatch();

    useEffect(() => {
        if (statusOrder)
            dispatch(setInitialOrder());
    }, [dispatch, statusOrder]);

    const OrderSuccess = () => {
        return(
            <div className={'OrderSuccess container text-center text-white'}>
                <p className={'color-white bg-success pt-4 pb-4 fs-5'}>Ваш заказ успешно добавлен. В ближайшее время менеджер свяжется с вами.</p>
            </div>
        )
    }

    return (
        <div className={'MainPage'}>
            {statusOrder && <OrderSuccess/>}
            <main className="container">
                <div className="row">
                    <div className="col">
                        <div className="banner">
                            <img src={'../banner.jpg'} className="img-fluid" alt="К весне готовы!"/>
                            <h2 className="banner-header">К весне готовы!</h2>
                        </div>
                        <TopSales />
                        <Catalog />
                    </div>
                </div>
            </main>
        </div>
    )
}