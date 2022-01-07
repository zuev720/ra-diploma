import {useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import qs from "qs";


export function CatalogSearchForm() {
    const history = useHistory();
    const location = useLocation();
    const {q, offset, categoryId} = qs.parse(location.search.substr(1));
    const [state, setState] = useState((q) ? q : '');

    const onInputChange = (e) => {
        setState(e.target.value);
    }

    const onSearchFormSubmit = (e) => {
        e.preventDefault();
        if (state === '') {
            return history.push({
                pathname: location.pathname,
                search: (categoryId) ? `?categoryId=${categoryId}` : state,
                state: !!(offset),
            });
        }
        const search = (location.search === '' || q)
            ? `?q=${state}`
            : `?q=${state}&${location.search.substr(1)}`;
        history.push({
            pathname: location.pathname,
            search: search,
            state: !!(offset),
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