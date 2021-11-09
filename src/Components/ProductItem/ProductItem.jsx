import React from "react";
import {Link} from "react-router-dom";
import {Image} from "../Image/Image";

export function ProductItem (props) {
    return(
        <div className="col-4 mt-3">
            <div className={props.class}>
                <Image images={props.images} title={props.title}/>
                <div className={'cardBody'}>
                    <p className="card-text">{props.title}</p>
                    <p className="card-text">{props.price} ₽</p>
                    <Link to={`/catalog/${props.id}`} className="btn btn-outline-primary">Заказать</Link>
                </div>
            </div>
        </div>
    )
}