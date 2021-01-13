import axios from "../../utilities/axios-orders";
import { ACTION_TYPES } from "./action-types";

export const purchaseBurger = (orderData) => {
    return async (dispatch, getState) => {
        try {
            dispatch(purchaseBurgerStart());
            const response = await axios.post(`/orders.json?auth=${getState().auth.idToken}`, orderData);
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        } catch (error) {
            dispatch(purchaseBurgerFailed(error));
        }
    };
};

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: ACTION_TYPES.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFailed = (error) => {
    return {
        type: ACTION_TYPES.PURCHASE_BURGER_FAILED,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: ACTION_TYPES.PURCHASE_BURGER_START
    };
};

export const purchaseInit = () => {
    return {
        type: ACTION_TYPES.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: ACTION_TYPES.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFailed = () => {
    return {
        type: ACTION_TYPES.FETCH_ORDERS_FAILED
    };
};

export const fetchOrdersStart = () => {
    return {
        type: ACTION_TYPES.FETCH_ORDERS_START
    };
};

export const fetchOrders = (userId) => {
    return async (dispatch, getState) => {
        try {
            dispatch(fetchOrdersStart());
            const queryParams = `?auth=${getState().auth.idToken}&orderBy="userId"&equalTo="${userId}"`;
            const response = await axios.get(`/orders.json${queryParams}`);
            const fetchedOrders = []
            for (let key in response.data) {
                fetchedOrders.push({ ...response.data[key], id: key });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        } catch (error) {
            dispatch(fetchOrdersFailed(error));
        }
    }
};
