import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";

export function CatalogSearchForm() {
    const history = useHistory();
    const location = useLocation();
    const catalogSearchValue = useSelector((state) => state.valueCatalogSearchForm);
    const [state, setState] = useState((catalogSearchValue) ? catalogSearchValue : '');

    useEffect(() => {
        setState(catalogSearchValue);
    }, [catalogSearchValue]);

    const onInputChange = (e) => {
        setState(e.target.value);
    }

    const onSearchFormSubmit = (e) => {
        e.preventDefault();
        history.push({
            pathname: location.pathname,
            search: `?q=${state}`,
        });
    };

    return(
        <form data-id="search-form" className={'catalog-search-form form-inline'} onSubmit={onSearchFormSubmit}>
            <input
                id={'form-control'}
                className={'form-control'}
                placeholder="Поиск"
                value={state}
                onChange={onInputChange}
                type={'text'}
            />
        </form>
    )
}