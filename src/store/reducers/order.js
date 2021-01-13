import { ACTION_TYPES } from "../actions/action-types";
import { updateObject } from "../../utilities/app-utility";

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.PURCHASE_INIT:
            return updateObject(state, { purchased: false });
        case ACTION_TYPES.PURCHASE_BURGER_START:
            return updateObject(state, { loading: true });
        case ACTION_TYPES.PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObject(action.orderData, { id: action.orderId });
            return updateObject(state, {
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            });
        case ACTION_TYPES.PURCHASE_BURGER_FAILED:
            return updateObject(state, { loading: false });
        case ACTION_TYPES.FETCH_ORDERS_START:
            return updateObject(state, { loading: true });
        case ACTION_TYPES.FETCH_ORDERS_SUCCESS:
            return updateObject(state, { loading: false, orders: action.orders });
        case ACTION_TYPES.FETCH_ORDERS_FAILED:
            return updateObject(state, { loading: false });
        default:
            return state;
    }
};

export default orderReducer;
