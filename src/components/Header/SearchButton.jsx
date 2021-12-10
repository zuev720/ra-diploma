import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {setValueSearchForm} from "../../store/slices/valueSearchFormSlice";

export function SearchButton(props) {
    const formStatus = props.formStatus;
    const inputSearchValue = useSelector((state) => state.valueSearchForm);
    const dispatch = useDispatch();
    const history = useHistory();

    const onSearchButtonClick = () => {
        if (formStatus && inputSearchValue !== '') {
            dispatch(setValueSearchForm(''));
            history.push({
                pathname: '/catalog',
                search: `?q=${inputSearchValue}`,
            });
        }
        props.setFormActive(!formStatus);
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