import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {fetchProduct} from "../../store/slices/productFetchSlice";
import {Preloader} from "../Preloader/Preloader";
import {SizeItem} from "./SizeItem";
import {QuantityBlock} from "./QuantityBlock";
import {Image} from "../Image/Image";
import {changeCart} from "../../store/slices/cartSlice";

export function ProductPage() {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const item = useSelector((state) => state.productFetch);
    useEffect(() => {
        history.push({pathname: `/catalog/${id}`})
        dispatch(fetchProduct({dispatch, id}));
    }, [dispatch, history, id]);

    const Product = () => {
        const [activeSize, setActiveSize] = useState(null);
        const [quantity, setQuantity] = useState(1);

        const onOrderClick = () => {
            const product = item.item;
            const totalPrice = product.price * quantity;
            const obj = {
                id: product.id,
                title: product.title,
                size: activeSize,
                totalPrice,
                price: product.price,
                quantity,
            };
            const orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];
            const matchOrder = orders.findIndex((elem) => elem.id === obj.id && elem.size === obj.size);
            if (matchOrder !== -1) {
                orders[matchOrder].quantity += obj.quantity;
                orders[matchOrder].totalPrice += obj.totalPrice;
            } else {
                orders.push(obj);
            }
            localStorage.setItem('orders', JSON.stringify(orders));
            dispatch(changeCart());
            history.push('/cart');
        }

        const ProductSizes = () => {
            const avalibleSizes = item.item.sizes.filter((item) => item.avalible);
            return (
                <p className={'mt-4'}>Размеры в наличии: {
                    avalibleSizes.map((size, index) =>
                        <SizeItem
                            key={index}
                            activeSize={activeSize}
                            setActiveSize={setActiveSize}
                            size={size.size}
                        />)
                }</p>
            )
        }

        return (
            <section className="catalog-item container">
                <h2 className="text-center">{item.item.title}</h2>
                <div className="row align-items-center">
                    <div className="col-5">
                        <Image images={item.item.images} className={'img-fluid'} alt={item.item.title}/>
                    </div>
                    <div className="col-7">
                        <table className="table table-bordered">
                            <tbody>
                            <tr>
                                <td>Артикул</td>
                                <td>{item.item.sku}</td>
                            </tr>
                            <tr>
                                <td>Производитель</td>
                                <td>{item.item.manufacturer}</td>
                            </tr>
                            <tr>
                                <td>Цвет</td>
                                <td>{item.item.color}</td>
                            </tr>
                            <tr>
                                <td>Материалы</td>
                                <td>{item.item.material}</td>
                            </tr>
                            <tr>
                                <td>Сезон</td>
                                <td>{item.item.season}</td>
                            </tr>
                            <tr>
                                <td>Повод</td>
                                <td>{item.item.reason}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="text-center">
                            <ProductSizes/>
                            {activeSize && <QuantityBlock quantity={quantity} setQuantity={setQuantity}/>}
                        </div>
                        {<button className="btn btn-danger btn-block btn-lg w-100 mt-2"
                                 onClick={onOrderClick}
                                 disabled={!activeSize}>В корзину</button>}
                    </div>
                </div>
            </section>
        )
    };
    return (
        <>
            {item.loading && <Preloader/>}
            {item.item && !item.loading && <Product/>}
        </>
    )
}