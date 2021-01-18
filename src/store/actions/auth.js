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
    return {
        type: ACTION_TYPES.AUTH_INITIATE_LOGOUT
    };
};

export const logoutSuccess = () => {
    return {
        type: ACTION_TYPES.LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: ACTION_TYPES.CHECK_AUTH_TIMEOUT,
        expirationTime: expirationTime
    };
};


export const authFailed = (error) => {
    return {
        type: ACTION_TYPES.AUTH_FAILED,
        error: error
    };
};

export const auth = (email, password, isSignUp) => {
    return {
        type: ACTION_TYPES.AUTH_USER,
        email: email,
        password: password,
        isSignUp: isSignUp
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: ACTION_TYPES.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return {
        type: ACTION_TYPES.AUTH_CHECK_STATE
    };
};
