import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUrl} from "../../store/Slices/currentUrlSlice";

export function CatalogSearchForm() {
    const dispatch = useDispatch();
    const catalogSearchValue = useSelector((state) => state.valueCatalogSearchForm);
    const [state, setState] = useState('');

    useEffect(() => {
        setState(catalogSearchValue);
    }, [catalogSearchValue]);

    const onInputChange = (e) => {
        setState(e.target.value);
    }

    const onSearchFormSubmit = (e) => {
        e.preventDefault();
        dispatch(setCurrentUrl(`${process.env.REACT_APP_API_URL}/items?q=${state}`));
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