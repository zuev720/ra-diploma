import React from "react";

export function QuantityBlock(props) {
    const onClickDecrement = () => {
        if (props.quantity === 1) return;
        let quantity = props.quantity;
        quantity--;
        props.setQuantity(quantity);
    }

    const onClickIncrement = () => {
        if (props.quantity === 10) return;
        let quantity = props.quantity;
        quantity++;
        props.setQuantity(quantity);
    }

    return(
        <p className={'mt-2'}>
            Количество:
            <span className="btn-group btn-group-sm pl-2">
                <button className="btn btn-secondary" onClick={onClickDecrement}>-</button>
                <span className="btn btn-outline-primary">{props.quantity}</span>
                <button className="btn btn-secondary" onClick={onClickIncrement}>+</button>
            </span>
        </p>
    )
}