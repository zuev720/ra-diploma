import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {activateSearchForm} from "../../store/Slices/activateSearchFormSlice";
import {useHistory} from "react-router-dom";
import {setValueCatalogSearchForm} from "../../store/Slices/valueCatalogSearchFormSlice";
import {setValueSearchForm} from "../../store/Slices/valueSearchFormSlice";
import {setInitialStateProducts} from "../../store/Slices/productsFetchSlice";
import {setCurrentUrl} from "../../store/Slices/currentUrlSlice";
import {setCurrentCategory} from "../../store/Slices/activeCategorySlice";

export function SearchButton(props) {
    const dispatch = useDispatch();
    const formStatus = useSelector((state) => state.activateSearchForm);
    const inputSearchValue = useSelector((state) => state.valueSearchForm);
    const history = useHistory();
    const onSearchButtonClick = () => {
        if (formStatus && inputSearchValue !== '') {
            dispatch(setCurrentCategory(0));
            if (history.location.pathname === '/catalog') {
                dispatch(setValueSearchForm(''));
                dispatch(setValueCatalogSearchForm(inputSearchValue));
            } else {
                dispatch(setValueCatalogSearchForm(inputSearchValue));
                dispatch(setValueSearchForm(''));
                history.push('/catalog');
            }
            dispatch(setInitialStateProducts());
            dispatch(setCurrentUrl(`${process.env.REACT_APP_API_URL}/items?q=${inputSearchValue}`));
        }
        dispatch(activateSearchForm((!formStatus)));
    };

    return (
        <label
            htmlFor={'form-control'}
            data-id="search-expander"
            className="header-controls-pic header-controls-search"
            onClick={onSearchButtonClick}
        />
    )
}