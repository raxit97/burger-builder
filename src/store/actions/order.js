import { ACTION_TYPES } from "./action-types";

export const purchaseBurger = (orderData, idToken) => {
    return {
        type: ACTION_TYPES.PURCHASE_BURGER,
        orderData: orderData,
        idToken: idToken
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

export const fetchOrders = (userId, idToken) => {
    return {
        type: ACTION_TYPES.FETCH_ORDERS,
        userId: userId,
        idToken: idToken
    };
};
