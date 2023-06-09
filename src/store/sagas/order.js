
import { put } from 'redux-saga/effects'
import axios from '../../utilities/axios-orders';
import * as actions from '../actions/index';

export function* purchaseBurgerSaga(action) {
    try {
        yield put(actions.purchaseBurgerStart());
        const response = yield axios.post(`/orders.json?auth=${action.idToken}`, action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch (error) {
        yield put(actions.purchaseBurgerFailed(error));
    }
}

export function* fetchOrdersSaga(action) {
    try {
        yield put(actions.fetchOrdersStart());
        const queryParams = `?auth=${action.idToken}&orderBy="userId"&equalTo="${action.userId}"`;
        const response = yield axios.get(`/orders.json${queryParams}`);
        const fetchedOrders = []
        for (let key in response.data) {
            fetchedOrders.push({ ...response.data[key], id: key });
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
        yield put(actions.fetchOrdersFailed(error));
    }
}
