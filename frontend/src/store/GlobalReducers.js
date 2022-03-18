// Node
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
// Own Reducers
import { adverts } from './reducers/AdvertsReducers';
import { session } from './reducers/SessionReducer';
import { ui } from './reducers/UiReducers';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  adverts,
  session,
  ui
});

export default createRootReducer;