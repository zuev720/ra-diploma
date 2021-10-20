import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {fetchCategories} from "../../store/Slices/categoriesFetchSlice";
import {Preloader} from "../Preloader/Preloader";

export function CategoriesList(props) {
    const items = useSelector((state) => state.categoriesFetch);
    const dispatch = useDispatch();
    // const [activeCategory, setActiveCategory] = useState(0);

    useEffect(() => {
        dispatch(fetchCategories({dispatch}));
    }, [dispatch]);

    const onCategoryClick = (e) => {
        props.setActiveCategory(Number(e.target.id));
        (Number(e.target.id) === 0)
            ? props.categoryRequest(`${process.env.REACT_APP_API_URL}/items`)
            : props.categoryRequest(`${process.env.REACT_APP_API_URL}/items?categoryId=${e.target.id}`);
    }

    const CategoryItem = (props) => {
        const className = (props.state === props.id) ? 'nav-link active' : 'nav-link';
        return (
            <li key={props.id} id={props.id} className={className} onClick={props.onCategoryClick}>{props.children}</li>
        )
    }

    return (
        <ul className="catalog-categories nav justify-content-center">
            {items.loading && <Preloader/>}
            {items.items && !items.loading &&
            <CategoryItem key={0} id={0} state={props.activeCategory} onCategoryClick={onCategoryClick}>Все</CategoryItem>}
            {items.items && !items.loading && items.items.map((item) =>
                <CategoryItem key={item.id} id={item.id} state={props.activeCategory}
                              onCategoryClick={onCategoryClick}>{item.title}
                </CategoryItem>
            )}
        </ul>
    )
}