// Imports
import * as ADVERTS from '../types/AdvertsTypes';
import * as SESSION from '../types/SessionTypes';
import { initialState } from '../InitialState';

/**
 * Reducer para gestionar el estado de la ui
 * @param {Object} state UI state
 * @param {Object} action Action
 */
export function ui(state = initialState.ui, action) {
    switch (action.type) {
        // Feching related
        case ADVERTS.FETCH_ADVERT_FAILURE:
        case ADVERTS.FETCH_ADVERTS_FAILURE:
        case ADVERTS.FETCH_USER_ADVERTS_FAILURE:
        case ADVERTS.FETCH_SOLD_HISTORY_FAILURE:
            return { ...state, isFetching: false, error: action.error }
        case ADVERTS.FETCH_ADVERT_REQUEST:
        case ADVERTS.FETCH_ADVERTS_REQUEST:
        case ADVERTS.FETCH_USER_ADVERTS_REQUEST:
        case ADVERTS.FETCH_SOLD_HISTORY_REQUEST:
            return { ...state, isFetching: true, error: null }
        case ADVERTS.FETCH_ADVERT_SUCCESS:
        case ADVERTS.FETCH_ADVERTS_SUCCESS:
        case ADVERTS.FETCH_USER_ADVERTS_SUCCESS:
        case ADVERTS.FETCH_SOLD_HISTORY_SUCCESS:
            return { ...state, currentPage: 0, isFetching: false, error: null }
        // Authention related
        case SESSION.LOGIN_REQUEST:
        case SESSION.LOGIN_TOKEN_REQUEST:
            return { ...state, error: null, isAuthenticating: true }
        case SESSION.LOGIN_FAILURE:
        case SESSION.LOGIN_TOKEN_FAILURE:
            return { ...state, error: action.error, isAuthenticating: false }
        case SESSION.LOGIN_SUCCESS:
        case SESSION.LOGIN_TOKEN_SUCCESS:
            return { ...state, error: null, isAuthenticating: false }
        // Edit related
        case ADVERTS.EDIT_ADVERT_REQUEST:
            return { ...state, error: null, isUpdating: true }
        case ADVERTS.EDIT_ADVERT_FAILURE:
            return { ...state, error: action.error, isUpdating: false }
        case ADVERTS.EDIT_ADVERT_SUCCESS:
            return { ...state, error: null, isUpdating: false }
        // Creation related
        case ADVERTS.CREATE_ADVERT_REQUEST:
            return { ...state, error: null, isCreating: true }
        case ADVERTS.CREATE_ADVERT_FAILURE:
                return { ...state, error: action.error, isCreating: false }
        case ADVERTS.CREATE_ADVERT_SUCCESS:
            return { ...state, error: null, isCreating: false }
        // Deletion related
        case ADVERTS.DELETE_ADVERT_REQUEST:
            return { ...state, isDeleting: true, error: null }
        case ADVERTS.DELETE_ADVERT_FAILURE:
            return { ...state, isDeleting: false, error: action.error }
        case ADVERTS.DELETE_ADVERT_SUCCESS:
            return { ...state, isDeleting: false, error: null }
        // Logout
        case SESSION.LOGOUT_SUCCESS:
        case SESSION.LOGOUT_FAILURE:
            return initialState.ui;
        // Default
        default:
            return state;
    }
}