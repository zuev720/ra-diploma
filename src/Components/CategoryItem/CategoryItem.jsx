import React from "react";
import {useDispatch} from "react-redux";
import {setValueCatalogSearchForm} from "../../store/Slices/valueCatalogSearchFormSlice";


export function CategoryItem(props) {
    const dispatch = useDispatch();
    const onCategoryClick = () => {
        if (Number(props.activeCategory) === Number(props.id)) return null;
        dispatch(setValueCatalogSearchForm(''));
        (Number(props.id) === 0)
            ? props.categoryRequest(`${process.env.REACT_APP_API_URL}/items`, Number(props.id))
            : props.categoryRequest(`${process.env.REACT_APP_API_URL}/items?categoryId=${Number(props.id)}`, Number(props.id));
    }
    return (
        <li key={props.id} className={props.className} onClick={onCategoryClick}>{props.children}</li>
    )
}