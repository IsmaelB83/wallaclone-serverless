// NPM Modules
import React, { useEffect } from 'react';
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// Components
import PrivateRoute from '../../components/utils/PrivateRoute';
// Containers
import SectionList from '../SectionList';
import Detail from '../Detail';
import Edit from '../Edit';
import Login from '../Login';
import Home from '../Home';
import Error404 from '../Error404';
// Own modules
import { SessionActions } from '../../store/GlobalActions';
import configureStore, { history } from '../../store';
import { initialState } from '../../store/InitialState';
import LocalStorage from '../../utils/Storage';
// Models
// Assets
// CSS

// APP Root Component
export default function App(props) {

    // Destructure props
    const { enqueueSnackbar, t } = props;

    // Handle actions performed from a push notification
    const handleNotifyAction = (content) => {
        switch (content.action) {
            case 'navigate':
                // Accion de navegación
                history.push(content.data)
                break;
            case 'delete':
                // Elimino de favoritos y navego a favoritos
                store.dispatch(SessionActions.setFavorite(content.data))
                .then(() => {
                    enqueueSnackbar(t('Product deleted from favorites'), { variant: 'success'});
                    history.push('/favorites')
                })
                .catch(error => enqueueSnackbar(t('Error deleting advert from favorites ERROR', {error}), { variant: 'error' }));
                break;
            case 'add':
                // Añado a favoritos y navego a favoritos
                store.dispatch(SessionActions.setFavorite(content.data))
                .then(() => {
                    enqueueSnackbar(t('Product added to favorites'), { variant: 'success'});
                    history.push('/favorites')
                })
                .catch(error => enqueueSnackbar(t('Error deleting advert from favorites ERROR', {error}), { variant: 'error' }));
                break;
            default:
                console.error('Uncontrolled action returned by service worker');
        }
    }
    
    // Session storage
    const session = LocalStorage.readLocalStorage();
    // Configuro el store, y sincronizo el history del store con el de router
    const store = configureStore(initialState, handleNotifyAction);

    // Dispatch login in case of session in local storage
    useEffect(() => {
        if (session && session.jwt) {
            store.dispatch(SessionActions.loginWithToken(session.jwt))
            .catch (error => enqueueSnackbar(error, { variant: 'error', }));
        }
    }, [store, session, enqueueSnackbar, t]);

    // Render
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path='/login' exact component={Login} />
                    <Route path='/published/:login' exact render={(props) => <SectionList {...props} listType='published'/>}/>
                    <PrivateRoute path='/history' exact render={(props) => <SectionList {...props} listType='history'/>}/>
                    <PrivateRoute path='/favorites' exact render={(props) => <SectionList {...props} listType='favorites'/>}/>
                    <PrivateRoute path='/advert/create' exact render={(props) => <Edit {...props} mode='create'/>}/>
                    <PrivateRoute path='/advert/edit/:slug' exact render={(props) => <Edit {...props} mode='edit'/>}/>
                    <Route path='/advert/:slug' exact component={Detail} />
                    <Route path='/' exact component={Home} />
                    <Route component={Error404} />
                </Switch>
            </ConnectedRouter>
        </Provider>
    );
}