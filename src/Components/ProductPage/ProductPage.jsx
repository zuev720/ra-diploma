import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {fetchProduct} from "../../store/Slices/productFetchSlice";
import {Preloader} from "../Preloader/Preloader";

export function ProductPage(props) {
    const {id} = useParams();
    const dispatch = useDispatch();
    const item = useSelector((state) => state.productFetch);
    useEffect(() => {
        dispatch(fetchProduct({dispatch, id}));
    }, [dispatch, id]);

    const Product = () => {
        return (
            <section className="catalog-item">
                <h2 className="text-center">{item.item.title}</h2>
                <div className="row">
                    <div className="col-5">
                        <img src={item.item.images[0]}
                             className="img-fluid" alt={item.item.title}/>
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
                            <p className={'mt-4'}>Размеры в наличии: <span
                                className="catalog-item-size selected">18 US</span> <span
                                className="catalog-item-size">20 US</span></p>
                            <p className={'mt-2'}>Количество: <span className="btn-group btn-group-sm pl-2">
                                        <button className="btn btn-secondary">-</button>
                                        <span className="btn btn-outline-primary">1</span>
                                        <button className="btn btn-secondary">+</button>
                                    </span>
                            </p>
                        </div>
                        <button className="btn btn-danger btn-block btn-lg w-100 mt-2">В корзину</button>
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