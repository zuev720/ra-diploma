import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {requestOrder} from "../../store/Slices/orderRequestSlice";
import {Preloader} from "../Preloader/Preloader";
import {setOrders} from "../../store/Slices/getOrdersSlice";
import {useHistory} from "react-router-dom";

export function Order(props) {
    const stateOrderRequest = useSelector((state) => state.requestOrders);
    const dispatch = useDispatch();
    const history = useHistory();
    const initialState = {
        phone: '',
        address: '',
    };

    const [state, setState] = useState(initialState);

    useEffect(() => {
        if (stateOrderRequest.success) {
            localStorage.removeItem('orders');
            dispatch(setOrders([]));
            history.push('/');
        }
    }, [dispatch, history, stateOrderRequest.success]);

    const onInputChange = (e) => {
        e.preventDefault();
        setState({...state, [e.target.name]: e.target.value});
    }

    const onOrderSubmit = (e) => {
        e.preventDefault();
        const items = props.orders.map((elem) => {
            return {
                id: elem.id,
                price: elem.totalPrice,
                count: elem.quantity,
            }
        });
        const obj = {
            owner: {
                phone: state.phone,
                address: state.address,
            },
            items,
        }
        dispatch(requestOrder({dispatch, obj}));
    }

    return(
        <section className="order container">
            {stateOrderRequest.loading && <Preloader />}
            {!stateOrderRequest.loading && <>
            <h2 className="text-center">Оформить заказ</h2>
                <div className="card">
                <form className="card-body" onSubmit={onOrderSubmit}>
                <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input className="form-control mt-2 mb-2" id="phone" name={'phone'} value={state.phone} placeholder="Ваш телефон" onChange={onInputChange} required={true}/>
                </div>
                <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input className="form-control mt-2 mb-2" id="address" name={'address'} value={state.address} placeholder="Адрес доставки" onChange={onInputChange} required={true}/>
                </div>
                <div className="form-group form-check mt-2 mb-2">
                <input type="checkbox" className="form-check-input" id="agreement" required={true}/>
                <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                </div>
                <button type="submit" className="btn btn-outline-secondary" onSubmit={onOrderSubmit}>Оформить</button>
                </form>
                </div>
            </>}
        </section>
    )
}