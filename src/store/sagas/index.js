import { takeEvery, all, takeLatest } from 'redux-saga/effects'
import { ACTION_TYPES } from '../actions/action-types';
import { logoutSaga, checkAuthTimeoutSaga, authSaga, checkAuthStatusSaga } from './auth';
import { initIngredientsSaga } from './burger-builder';
import { fetchOrdersSaga, purchaseBurgerSaga } from './order';

export function* watchAuthSaga() {
    yield all([
        takeEvery(ACTION_TYPES.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(ACTION_TYPES.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(ACTION_TYPES.AUTH_USER, authSaga),
        takeEvery(ACTION_TYPES.AUTH_CHECK_STATE, checkAuthStatusSaga)
    ])
}

export function* watchBurgerBuilderSaga() {
    yield takeEvery(ACTION_TYPES.INIT_INGREDIENTS_SAGA, initIngredientsSaga);
}

export function* orderSaga() {
    yield takeLatest(ACTION_TYPES.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(ACTION_TYPES.FETCH_ORDERS, fetchOrdersSaga);
}
