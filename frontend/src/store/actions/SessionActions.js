// API
import AuthServices from '../../services/AuthServices';
import UserServices from '../../services/UserServices';
// Models
import Session from '../../models/Session';
// Own modules
import LocalStorage from '../../utils/Storage';
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
            UserServices.get(session.userId, session.jwt)
            .then(profile => session.setUserInformation(profile))
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                dispatch(loginRedirectAction(session));
                LocalStorage.saveLocalStorage(session);
                return extra.history.push('/');
            })
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

/**
 * Editar datos de usuario
 * @param {Object} user Objeto con los nuevos datos del usuario
 * @param {String} jwt Token para autenticar en la API
 */
 export const editUser = user => {   
    return async function(dispatch, getState, extra) {
        dispatch(editUserRequest());
        return UserServices.edit(user, getState().session.jwt)
        .then (response => {
            dispatch(editUserSuccess(response))
            extra.history.push('/');
            return response;
        })
        .catch(error => {
            if (error.response && error.response.status === 401) dispatch(logout());
            let message = error.response && error.response.data ? error.response.data.data : error.message;            
            dispatch(editUserFailure(message));
            throw message;
        })
    }
};

const editUserRequest = () => ({ type: ACTIONS.EDIT_ACCOUNT_REQUEST });
const editUserFailure = error => ({ type: ACTIONS.EDIT_ACCOUNT_FAILURE, error });
const editUserSuccess = user => ({ type: ACTIONS.EDIT_ACCOUNT_SUCCESS, user });
