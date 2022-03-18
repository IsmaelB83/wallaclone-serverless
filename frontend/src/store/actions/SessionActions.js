// API
import AuthServices from '../../services/AuthServices';
// Own modules
import LocalStorage from '../../utils/Storage';
import Session from '../../models/Session';
// Actions
import * as ACTIONS from '../types/SessionTypes';

// Constants
const authServices = new AuthServices();

/**
* LoginRequest to auth
* @param {String} login Login del usuario
* @param {String} password Password del usuario
*/
export const loginRequest = () => {
    return async function(dispatch, getState, extra) { 
        dispatch(loginRequestAction())
        return authServices.login()
    }
}

const loginRequestAction = () => ({ type: ACTIONS.LOGIN_REQUEST });

/**
* Login redirect from auth0
* @param {String} login Login del usuario
* @param {String} password Password del usuario
*/
export const loginRedirect = jwt => {  
    return async function(dispatch, getState, extra) {
        authServices.handleAuthentication((err, authResult) => {
            if (err) {
                alert(`Error: ${err.error}. Check the console for further details.`);
                return extra.history.push('/login');
            }
            const session = new Session (authResult.expiresIn, authResult.idToken, authResult.idTokenPayload.sub);
            dispatch(loginRedirectAction(session));
            LocalStorage.saveLocalStorage(session);
            return extra.history.push('/');
        })

    }
};

const loginRedirectAction = session => ({ type: ACTIONS.LOGIN_SUCCESS, session });

/**
* Login with token from local storage (validate first in backend)
*/
export const loginFromStorage = jwt => {   
    return async function(dispatch, getState, extra) {
        const session = new Session (jwt);
        dispatch(loginFromStorageAction(session));
        return { type: ACTIONS.LOGIN_FROM_STORAGE, session }
    }
};

const loginFromStorageAction = session => ({ type: ACTIONS.LOGIN_FROM_STORAGE, session });

/**
* Logout
*/
export const logout = () => {
    return async function(dispatch, getState, extra) {
        dispatch(logoutAction());
        authServices.logout()
        LocalStorage.cleanLocalStorage();
    }
};

const logoutAction = () => ({ type: ACTIONS.LOGOUT_SUCCESS })
