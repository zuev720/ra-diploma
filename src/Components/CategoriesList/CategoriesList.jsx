import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {fetchCategories} from "../../store/Slices/categoriesFetchSlice";
import {Preloader} from "../Preloader/Preloader";
import {CategoryItem} from "../CategoryItem/CategoryItem";
import {setCurrentUrl} from "../../store/Slices/currentUrlSlice";
import {setCurrentCategory} from "../../store/Slices/activeCategorySlice";

export function CategoriesList(props) {
    const items = useSelector((state) => state.categoriesFetch);
    const activeCategory = useSelector((state) => state.activeCategory);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories({dispatch}));
    }, [dispatch]);

    const categoryRequest = (url, id) => {
        props.setOffSet(6);
        dispatch(setCurrentCategory(id));
        dispatch(setCurrentUrl(url));
    };

    return (
        <ul className="catalog-categories nav justify-content-center">
            {items.loading && <Preloader/>}
            {items.items && !items.loading &&
            <CategoryItem
                key={0}
                id={0}
                className={(activeCategory === 0) ? 'nav-link active' : 'nav-link'}
                activeCategory={activeCategory}
                categoryRequest={categoryRequest}>Все
            </CategoryItem>}
            {items.items && !items.loading && items.items.map((item) =>
                <CategoryItem
                    key={item.id}
                    id={item.id}
                    className={(activeCategory === item.id) ? 'nav-link active' : 'nav-link'}
                    activeCategory={activeCategory}
                    categoryRequest={categoryRequest}
                    >{item.title}
                </CategoryItem>
            )}
        </ul>
    )
}