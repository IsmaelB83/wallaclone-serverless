// API
import AuthServices from '../../services/AuthServices';
// Own modules
import LocalStorage from '../../utils/Storage';
// Actions
import * as ACTIONS from '../types/SessionTypes';

/**
 * Login con usuario y password
 * @param {String} login Login del usuario
 * @param {String} password Password del usuario
 */
export const login = (login, password) => {   
    return async function(dispatch, getState, extra) {
        dispatch(loginRequest());
        return AuthServices.login(login, password)
        .then(response => {
            dispatch(loginSuccess(response));
            LocalStorage.saveLocalStorage(getState().session);
            // go home
            extra.history.push('/');
            return response;
        })
        .catch (error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;
            dispatch(loginFailure(message));
            throw message;
        });
    }
};

const loginRequest = () => ({ type: ACTIONS.LOGIN_REQUEST });
const loginSuccess = session => ({ type: ACTIONS.LOGIN_SUCCESS, session });
const loginFailure = error => ({ type: ACTIONS.LOGIN_FAILURE, error });

/**
 * Login con token
 */
export const loginWithToken = (jwt) => {   
    return async function(dispatch, getState, extra) {
        dispatch(loginWithTokenRequest());
        return AuthServices.loginWithToken(jwt)
        .then(response => {
            // Distpatch login and save in local storage
            dispatch(loginWithTokenSuccess(response));
            LocalStorage.saveLocalStorage(getState().session);
            // go home
            extra.history.push('/');
            return response;
        })
        .catch (error => {
            LocalStorage.cleanLocalStorage();
            let message = error.response && error.response.data ? error.response.data.data : error.message;
            dispatch(loginWithTokenFailure(message));
            throw message;
        });
    }
};

const loginWithTokenRequest = () => ({ type: ACTIONS.LOGIN_TOKEN_REQUEST });
const loginWithTokenSuccess = session => ({ type: ACTIONS.LOGIN_TOKEN_SUCCESS, session });
const loginWithTokenFailure = error => ({ type: ACTIONS.LOGIN_TOKEN_FAILURE, error });

/**
 * Logout
 */
export const logout = () => {
    return async function(dispatch, getState, extra) {
        dispatch(logoutRequest());
        return AuthServices.logout(getState().session.jwt)
        .then(response => {
            // distpatch logout and clear local storage
            dispatch(logoutSuccess());
            LocalStorage.cleanLocalStorage();
            // go login
            extra.history.push('/login');
            return response;
        })
        .catch (error => {
            let message = error.response && error.response.data ? error.response.data.data : error.message;
            dispatch(logoutFailure(message));
            LocalStorage.cleanLocalStorage();
            extra.history.push('/login');
            throw message;
        });
    }
};

const logoutRequest = () => ({ type: ACTIONS.LOGOUT_REQUEST });
const logoutSuccess = () => ({ type: ACTIONS.LOGOUT_SUCCESS });
const logoutFailure = error => ({ type: ACTIONS.LOGOUT_FAILURE, error });