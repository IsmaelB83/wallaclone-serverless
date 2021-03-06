// Imports
import * as TYPES from '../types/SessionTypes';
import { initialState } from '../InitialState';

/**
 * Reducer para gestionar las acciones sobre la sesion de usuario
 * @param {Array} state Anuncios
 * @param {Object} action Action
 */
export function session (state = initialState.session, action) {
    switch (action.type) {
        case TYPES.LOGIN_SUCCESS:
            return action.session;
        case TYPES.LOGIN_REQUEST:
        case TYPES.LOGOUT_SUCCESS:
        case TYPES.LOGIN_ERROR:
            return initialState.session;
        case TYPES.EDIT_ACCOUNT_SUCCESS:
            return {
                ...state,
                email: action.user.email,
                login: action.user.login,
                name: action.user.name,
                isRequiredProfile: false
            }
        case TYPES.UPLOAD_AVATAR_SUCCESS:
            return { ...state, avatar: action.avatar }
        default:
            return state;
    }
}