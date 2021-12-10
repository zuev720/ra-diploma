import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export function HeaderCartIcon() {
    const orders = useSelector((state) => state.getOrders);

    return(
        <Link to={'/cart'} className="header-controls-pic header-controls-cart">
            {orders && orders.length !== 0 && <div className="header-controls-cart-full">{orders.length}</div>}
            <div className="header-controls-cart-menu" />
        </Link>
    )
}