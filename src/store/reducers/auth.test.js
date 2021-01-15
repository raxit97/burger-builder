import { ACTION_TYPES } from '../actions/action-types';
import authReducer from './auth';

describe('Auth Reducer', () => {
    it('Should return initial state when invalid action type is passed', () => {
        expect(authReducer(undefined, {})).toEqual({
            idToken: null,
            userId: null,
            error: false,
            loading: false,
            authRedirectPath: '/'
        });
    });
    it('Shopuld store token upon login', () => {
        expect(authReducer({
            idToken: null,
            userId: null,
            error: false,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: ACTION_TYPES.AUTH_SUCCESS,
            token: 'some-token',
            userId: 'some-user-id'
        })).toEqual({
            idToken: 'some-token',
            userId: 'some-user-id',
            error: false,
            loading: false,
            authRedirectPath: '/'
        });
    })
});
