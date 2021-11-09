import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {fetchProduct} from "../../store/Slices/productFetchSlice";
import {Preloader} from "../Preloader/Preloader";
import {SizeItem} from "./SizeItem";
import {QuantityBlock} from "./QuantityBlock";
import {wrightOrderToLocalStorage} from "../../Functions/wrightOrderToLocalStorage";
import {setOrders} from "../../store/Slices/getOrdersSlice";

export function ProductPage() {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const item = useSelector((state) => state.productFetch);
    useEffect(() => {
        dispatch(fetchProduct({dispatch, id}));
    }, [dispatch, id]);

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
            }
            wrightOrderToLocalStorage(obj);
            dispatch(setOrders(JSON.parse(localStorage.getItem('orders'))));
            history.push('/cart');
        }

        const ProductSizes = () => {
            const avalibleSizes = item.item.sizes.filter((item) => item.avalible);
            return(
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
                        <img src={item.item.images[0]} className="img-fluid" alt={item.item.title}/>
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
                        {activeSize && <button className="btn btn-danger btn-block btn-lg w-100 mt-2" onClick={onOrderClick}>В корзину</button>}
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