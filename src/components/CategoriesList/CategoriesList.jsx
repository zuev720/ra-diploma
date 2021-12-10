import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {fetchCategories} from "../../store/slices/categoriesFetchSlice";
import {Preloader} from "../Preloader/Preloader";
import {CategoryItem} from "../CategoryItem/CategoryItem";

export function CategoriesList(props) {
    const items = useSelector((state) => state.categoriesFetch);
    const activeCategory = props.activeCategory;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories({dispatch}));
    }, [dispatch]);

    return (
        <ul className="catalog-categories nav justify-content-center">
            {items.loading && <Preloader/>}
            {items.items && !items.loading &&
            <CategoryItem
                key={0}
                id={0}
                className={(activeCategory === 0) ? 'nav-link active' : 'nav-link'}
                activeCategory={props.activeCategory}
                setActiveCategory={props.setActiveCategory}
                setStepOff={props.setStepOff}>Все
            </CategoryItem>}
            {items.items && !items.loading && items.items.map((item) =>
                <CategoryItem
                    key={item.id}
                    id={item.id}
                    className={(activeCategory === item.id) ? 'nav-link active' : 'nav-link'}
                    activeCategory={props.activeCategory}
                    setActiveCategory={props.setActiveCategory}
                    setStepOff={props.setStepOff}
                    >{item.title}
                </CategoryItem>
            )}
        </ul>
    )
}