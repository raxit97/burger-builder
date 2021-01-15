import { ACTION_TYPES } from "../actions/action-types";
import { updateObject } from "../../utilities/app-utility";

const initialState = {
    idToken: null,
    userId: null,
    error: false,
    loading: false,
    authRedirectPath: '/'
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.AUTH_START:
            return updateObject(state, { error: null, loading: true });
        case ACTION_TYPES.AUTH_SUCCESS:
            return updateObject(state, {
                error: false,
                loading: false,
                idToken: action.token,
                userId: action.userId
            });
        case ACTION_TYPES.AUTH_FAILED:
            return updateObject(state, { error: action.error, loading: false });
        case ACTION_TYPES.LOGOUT:
            return updateObject(state, { idToken: null, userId: null });
        case ACTION_TYPES.SET_AUTH_REDIRECT_PATH:
            return updateObject(state, { authRedirectPath: action.path });
        default:
            return state;
    }
};

export default authReducer
