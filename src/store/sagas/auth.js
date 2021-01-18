import axios from 'axios';
import { put, delay } from 'redux-saga/effects'
import * as actions from '../actions/index';

export function* logoutSaga() {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSuccess());
};

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime);
    yield put(actions.logout());
}

export function* authSaga(action) {
    try {
        yield put(actions.authStart());
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjB0WA3eNWKXobDQmfxBzLYBnIHTWme9g';
        if (!action.isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjB0WA3eNWKXobDQmfxBzLYBnIHTWme9g';
        }
        const response = yield axios.post(url, {
            email: action.email,
            password: action.password,
            returnSecureToken: true
        });
        if (response.data) {
            const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
            yield localStorage.setItem('token', response.data.idToken);
            yield localStorage.setItem('expirationDate', expirationDate);
            yield localStorage.setItem('userId', response.data.localId);
            yield put(actions.authSuccess(response.data.idToken, response.data.localId));
            yield put(actions.checkAuthTimeout(Number(response.data.expiresIn) * 1000));
        } else {
            yield put(actions.authFailed(true));
        }
    } catch (error) {
        yield put(actions.authFailed(error.response.data.error));
    }
}

export function* checkAuthStatusSaga() {
    const token = yield localStorage.getItem('token');
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
    const userId = yield localStorage.getItem('userId');
    if (!token) {
        yield put(actions.logout());
    } else {
        if (expirationDate > new Date()) {
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout(expirationDate.valueOf() - new Date().valueOf()));
        } else {
            yield put(actions.logout());
        }
    }
}
