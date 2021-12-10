import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setValueSearchForm} from "../../store/slices/valueSearchFormSlice";

export function SearchForm(props) {
    const formStatus = props.formStatus;
    const inputValue = useSelector((state) => state.valueSearchForm);
    const dispatch = useDispatch();

    const onInputChange = (e) => {
        dispatch(setValueSearchForm(e.target.value));
    }
    const className = (formStatus) ? 'header-controls-search-form form-inline' : 'header-controls-search-form form-inline invisible';

    const onSearchFormSubmit = (e) => e.preventDefault();

    return(
        <form data-id="search-form" className={className} onSubmit={onSearchFormSubmit}>
            <input
                id={'form-control'}
                className="form-control"
                placeholder="Поиск"
                value={inputValue}
                onChange={onInputChange}
                type={'text'}
            />
        </form>
    )
}