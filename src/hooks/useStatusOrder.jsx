import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

export function useStatusOrder() {
    const stateOrderRequest = useSelector((state) => state.requestOrders);
    const [state, setState] = useState(!!(stateOrderRequest.success));

    useEffect(() => {
        if (state) {
            setTimeout(() => setState(false), 5000);
        }
    }, [state, stateOrderRequest.success]);

    return state;
}