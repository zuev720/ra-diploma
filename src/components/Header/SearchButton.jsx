import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import {setValueSearchForm} from "../../store/slices/valueSearchFormSlice";
import qs from "qs";


export function SearchButton(props) {
    const formStatus = props.formStatus;
    const inputSearchValue = useSelector((state) => state.valueSearchForm);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const onSearchButtonClick = () => {
        if (formStatus && inputSearchValue !== '') {
            const {q} = qs.parse(location.search.substr(1));
            if (q === inputSearchValue) {
                dispatch(setValueSearchForm(''));
                props.setFormActive(!formStatus);
                return
            }
            const search = `?q=${inputSearchValue}&${location.search.substr(1)}`
            dispatch(setValueSearchForm(''));
            history.push({
                pathname: '/catalog',
                search,
                state: true,
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