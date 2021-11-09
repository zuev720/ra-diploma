import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export function HeaderCartIcon() {
    const currentOrders = useSelector((state) => state.getOrders);
    return(
        <Link to={'/cart'} className="header-controls-pic header-controls-cart">
            {currentOrders.length !== 0 && <div className="header-controls-cart-full">{currentOrders.length}</div>}
            <div className="header-controls-cart-menu" />
        </Link>
    )
}