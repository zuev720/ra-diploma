import React from "react";

export function CategoryItem(props) {
    const onCategoryClick = () => {
        if (Number(props.activeCategory) === Number(props.id)) return null;
        props.setActiveCategory(Number(props.id));
        props.setStepOff(0);
    }
    return (
        <li key={props.id} className={props.className} onClick={onCategoryClick}>{props.children}</li>
    )
}