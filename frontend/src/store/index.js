// Node imports
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
// Own imports
import createRootReducer from './GlobalReducers';

const loggerMiddleware = createLogger();
const componseEnhancers = composeWithDevTools({
    name: `Redux`,
    realtime: true,
    trace: true,
    traceLimit: 25
});

// History
export const history = createBrowserHistory()

// Store
let store;

// Configura el store
export default function configureStore(preloadedState) {
    const middlewares = [ thunkMiddleware.withExtraArgument({history}), routerMiddleware(history) ];
    if (process.env === 'development') {
        middlewares.push(loggerMiddleware);
    }
    store = createStore(
        createRootReducer(history),
        preloadedState,
        componseEnhancers(applyMiddleware(...middlewares)),
    );
    return store;
}

export function getStore(){ return store };