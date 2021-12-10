import React from "react";

export function SizeItem(props) {
    const className = (props.activeSize === props.size) ? 'catalog-item-size selected' : 'catalog-item-size';

    const onClickSize = (e) => {
        (props.activeSize === props.size) ? props.setActiveSize(null) : props.setActiveSize(props.size);
    };

    return(
        <span className={className} onClick={onClickSize}>{props.size}</span>
    )
}