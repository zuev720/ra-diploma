import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const requestOrder = createAsyncThunk(
    'request/requestOrder',
    async (props) => {
        const dispatch = props.dispatch;
        const order = props.obj;
        dispatch(request());
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/order`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(order),
            });
            if (!response.ok) {
                dispatch(requestFailure(response.statusText));
            }
            const result = await response;
            if (result.status === 204 && result.ok) {
                dispatch(requestSuccess());
            }
        } catch (e) {
            dispatch(requestFailure(e.message));
        }
    });

const initialState = {
   success: false, loading: false, error: null,
};

export const requestOrdersReducer = createSlice({
    name: 'requestOrders',
    initialState,
    reducers: {
        request(state) {
            state.loading = true;
        },
        requestFailure(state, action) {
            state.error = action.payload.error;
            state.loading = false;
        },
        requestSuccess(state) {
            state.success = true;
            state.loading = false;
        },
        setInitialOrder() {
            return initialState;
        }
    },
});

export const {request, requestFailure, requestSuccess, setInitialOrder} = requestOrdersReducer.actions;

export default requestOrdersReducer.reducer;