import axios from "axios";
import { ACTION_TYPES } from "./action-types"

export const authStart = () => {
    return {
        type: ACTION_TYPES.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: ACTION_TYPES.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: ACTION_TYPES.LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};


export const authFailed = (error) => {
    return {
        type: ACTION_TYPES.AUTH_FAILED,
        error: error
    };
};

export const auth = (email, password, isSignUp) => {
    return async (dispatch) => {
        try {
            dispatch(authStart());
            let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjB0WA3eNWKXobDQmfxBzLYBnIHTWme9g';
            if (!isSignUp) {
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjB0WA3eNWKXobDQmfxBzLYBnIHTWme9g';
            }
            const response = await axios.post(url, {
                email: email,
                password: password,
                returnSecureToken: true
            });
            if (response.data) {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(Number(response.data.expiresIn) * 1000));
            } else {
                dispatch(authFailed(true));
            }
        } catch (error) {
            dispatch(authFailed(error.response.data.error));
        }
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: ACTION_TYPES.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        const userId = localStorage.getItem('userId');
        if (!token) {
            dispatch(logout());
        } else {
            if (expirationDate > new Date()) {
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout(expirationDate.valueOf() - new Date().valueOf()));
            } else {
                dispatch(logout());
            }
        }
    }
};
