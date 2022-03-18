// API
import AdvertServices from '../../services/AdvertServices';
// Actions
import * as ACTIONS from '../types/AdvertsTypes';
import { logout } from './SessionActions';

/**
* Obtener datos de un anuncio
* @param {String} slug Slug identificativo del anuncio
*/
export const fetchAdvert = slug => {
  return async function(dispatch, getState, extra) {
    dispatch(fetchAdvertRequest());
    return AdvertServices.getAdvert(slug)
    .then(advert => {
      dispatch(fetchAdvertSuccess(advert));
      return advert;
    })
    .catch(error => {
      let message = error.response && error.response.data ? error.response.data.data : error.message;  
      dispatch(fetchAdvertFailure(message));
      throw message;
    });
  }
};

const fetchAdvertRequest = () => ({ type: ACTIONS.FETCH_ADVERT_REQUEST });
const fetchAdvertFailure = error => ({ type: ACTIONS.FETCH_ADVERT_FAILURE, error });
const fetchAdvertSuccess = advert => ({ type: ACTIONS.FETCH_ADVERT_SUCCESS, advert });

/**
* Obtener anuncios de la base de datros sin ningún tipo de filtro
*/
export const fetchAdverts = () => {   
  return async function(dispatch, getState, extra) {
    dispatch(fetchAdvertsRequest());
    return AdvertServices.getAdverts()
    .then(response => {
      dispatch(fetchAdvertsSuccess(response.adverts, response.totalCount, response.start, response.end));
      return response;
    })
    .catch (error => {
      let message = error.response && error.response.data ? error.response.data.data : error.message;
      dispatch(fetchAdvertsFailure(message));
      throw message;
    });
  }
};

const fetchAdvertsRequest = () => ({ type: ACTIONS.FETCH_ADVERTS_REQUEST });
const fetchAdvertsFailure = error => ({ type: ACTIONS.FETCH_ADVERTS_FAILURE, error });
const fetchAdvertsSuccess = (adverts, totalCount, start, end) => ({ type: ACTIONS.FETCH_ADVERTS_SUCCESS, adverts, totalCount, start, end });

/**
* Obtener anuncios de del usuario indicado
*/
export const fetchUserAdverts = () => {   
  return async function(dispatch, getState, extra) {
    dispatch(fetchUserAdvertsRequest());
    return AdvertServices.userProducts(getState().session.jwt)
    .then(response => {
      dispatch(fetchUserAdvertsSuccess(response.adverts, response.totalCount, response.start, response.end));
      return response;
    })
    .catch(error => {
      let message = error.response && error.response.data ? error.response.data.data : error.message;
      dispatch(fetchUserAdvertsFailure(message));
      throw message;
    })
  }
};

const fetchUserAdvertsRequest = () => ({ type: ACTIONS.FETCH_USER_ADVERTS_REQUEST });
const fetchUserAdvertsFailure = error => ({ type: ACTIONS.FETCH_USER_ADVERTS_FAILURE, error });
const fetchUserAdvertsSuccess = (adverts, totalCount, start, end) => ({ type: ACTIONS.FETCH_USER_ADVERTS_SUCCESS, adverts, totalCount, start, end });

/**
* Devuelve el historial de ventas de el usuario logueado
*/
export const fetchSoldHistory = () => {
  return async function(dispatch, getState, extra) {
    dispatch(fetchSoldHistoryRequest());
    return AdvertServices.soldHistory(getState().session.jwt)
    .then(response => {
      dispatch(fetchSoldHistorySuccess(response.adverts, response.totalCount, response.start, response.end));
      return response;
    })
    .catch(error => {
      if (error.response && error.response.status === 401) dispatch(logout());
      let message = error.response && error.response.data ? error.response.data.data : error.message;
      dispatch(fetchSoldHistoryFailure(message));
      throw message;
    });
  }
};

const fetchSoldHistoryRequest = () => ({ type: ACTIONS.FETCH_SOLD_HISTORY_REQUEST });
const fetchSoldHistoryFailure = error => ({ type: ACTIONS.FETCH_SOLD_HISTORY_FAILURE, error });
const fetchSoldHistorySuccess = (adverts, totalCount, start, end) => ({ type: ACTIONS.FETCH_SOLD_HISTORY_SUCCESS, adverts, totalCount, start, end });

/**
* Editar datos de un anuncio
* @param {Object} advert Datos actualizados del anuncio
*/
export const editAdvert = advert => {   
  return async function(dispatch, getState, extra) {
    dispatch(editAdvertRequest());
    return AdvertServices.editAdvert(advert, getState().session.jwt)
    .then(response => {
      dispatch(editAdvertSuccess(response));
      extra.history.push('/');
      return response;
    })
    .catch(error => {
      if (error.response && error.response.status === 401) dispatch(logout());
      let message = error.response && error.response.data ? error.response.data.data : error.message;  
      dispatch(editAdvertFailure(message));
      throw message;
    });
  }
};

const editAdvertRequest = () => ({ type: ACTIONS.EDIT_ADVERT_REQUEST });
const editAdvertFailure = error => ({ type: ACTIONS.EDIT_ADVERT_FAILURE, error });
const editAdvertSuccess = advert => ({ type: ACTIONS.EDIT_ADVERT_SUCCESS, advert });

/**
* Reservar un producto
* @param {String} slug Slug identificativo del producto
*/
export const bookAdvert = (slug) => {   
  return async function(dispatch, getState, extra) {
    dispatch(bookAdvertRequest());
    return AdvertServices.bookAdvert(slug, getState().session.jwt)
    .then(response => {
      dispatch(bookAdvertSuccess(response));
      return response;
    })
    .catch(error => {
      if (error.response && error.response.status === 401) dispatch(logout());
      let message = error.response && error.response.data ? error.response.data.data : error.message;  
      dispatch(bookAdvertFailure(message));
      throw message;
    });
  }
};

const bookAdvertRequest = () => ({ type: ACTIONS.BOOK_ADVERT_REQUEST });
const bookAdvertFailure = error => ({ type: ACTIONS.BOOK_ADVERT_FAILURE, error });
const bookAdvertSuccess = advert => ({ type: ACTIONS.BOOK_ADVERT_SUCCESS, advert });

/**
* Marcar un producto como vendido
* @param {String} slug Slug identificativo del producto
*/
export const sellAdvert = (slug) => {   
  return async function(dispatch, getState, extra) {
    dispatch(sellAdvertRequest());
    return AdvertServices.sellAdvert(slug, getState().session.jwt)
    .then(response => {
      dispatch(sellAdvertSuccess(response));
      return response;
    })
    .catch(error => {
      if (error.response && error.response.status === 401) dispatch(logout());
      let message = error.response && error.response.data ? error.response.data.data : error.message;  
      dispatch(sellAdvertFailure(message));
      throw message;
    });
  }
};

const sellAdvertRequest = () => ({ type: ACTIONS.SELL_ADVERT_REQUEST });
const sellAdvertFailure = error => ({ type: ACTIONS.SELL_ADVERT_FAILURE, error });
const sellAdvertSuccess = advert => ({ type: ACTIONS.SELL_ADVERT_SUCCESS, advert });

/**
* Crear un anuncio nuevo
* @param {Object} advert Objeto con los datos del anuncio a crear
*/
export const createAdvert = (advert) => {   
  return async function(dispatch, getState, extra) {
    dispatch(createAdvertRequest());
    delete advert._id;
    return AdvertServices.postAdvert(advert, getState().session.jwt)
    .then(response => {
      dispatch(createAdvertSuccess(response));
      extra.history.push('/');
      return response;
    })
    .catch(error => {
      if (error.response && error.response.status === 401) dispatch(logout());
      let message = error.response && error.response.data ? error.response.data.data : error.message;  
      dispatch(createAdvertFailure(message));
      throw message;
    });
  }
};

const createAdvertRequest = () => ({ type: ACTIONS.CREATE_ADVERT_REQUEST });
const createAdvertFailure = error => ({ type: ACTIONS.CREATE_ADVERT_FAILURE, error });
const createAdvertSuccess = advert => ({ type: ACTIONS.CREATE_ADVERT_SUCCESS, advert });

/**
* Eliminar un anuncio de la base de datos
* @param {String} slug Slug del anuncio que queremos eliminar
*/
export const deleteAdvert = (slug) => {   
  return async function(dispatch, getState, extra) {
    dispatch(deleteAdvertRequest());
    return AdvertServices.deleteAdvert(slug, getState().session.jwt)
    .then(response => {
      dispatch(deleteAdvertSuccess(response));
      extra.history.push('/');
      return response;
    })
    .catch(error => {
      if (error.response && error.response.status === 401) dispatch(logout());
      let message = error.response && error.response.data ? error.response.data.data : error.message;  
      dispatch(deleteAdvertFailure(message));
      throw message;
    });
  }
};

const deleteAdvertRequest = () => ({ type: ACTIONS.DELETE_ADVERT_REQUEST });
const deleteAdvertFailure = error => ({ type: ACTIONS.DELETE_ADVERT_FAILURE, error });
const deleteAdvertSuccess = advert => ({ type: ACTIONS.DELETE_ADVERT_SUCCESS, advert });