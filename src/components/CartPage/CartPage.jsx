import React from "react";
import {Link} from "react-router-dom";
import {Order} from "./Order";
import {useDispatch, useSelector} from "react-redux";
import {changeCart} from "../../store/slices/cartSlice";

export function CartPage() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.getOrders);
    const totalPrice = orders.reduce((acc, elem) => acc + elem.totalPrice, 0);

    const onDeleteOrderClick = (id) => {
        localStorage.setItem('orders', JSON.stringify(orders.filter((elem) => elem.id !== id)));
        dispatch(changeCart());
    };

    return (<>
            <section className="cart container">
                <h2 className="text-center">Корзина</h2>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Размер</th>
                        <th scope="col">Кол-во</th>
                        <th scope="col">Стоимость</th>
                        <th scope="col">Итого</th>
                        <th scope="col">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((elem, index) =>
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td><Link to={`/catalog/${elem.id}`}>{elem.title}</Link></td>
                            <td>{elem.size}</td>
                            <td>{elem.quantity}</td>
                            <td>{elem.price} руб.</td>
                            <td>{elem.totalPrice} руб.</td>
                            <td>
                                <button className="btn btn-outline-danger btn-sm" onClick={() => onDeleteOrderClick(elem.id)}>Удалить</button>
                            </td>
                        </tr>)}
                    <tr>
                        <td colSpan="5" className="text-right">Общая стоимость</td>
                        <td>{totalPrice} руб.</td>
                    </tr>
                    </tbody>
                </table>
            </section>
            <Order orders={orders}/>
        </>
    )
}