// NPM Modules
import React from 'react';
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
import Callback from '../Callback';
import Home from '../Home';
import Profile from '../Profile';
import Error404 from '../Error404';
// Own modules
import configureStore, { history } from '../../store';
import { initialState } from '../../store/InitialState';
// Models
// Assets
// CSS

// APP Root Component
export default function App(props) {

    // Configuro el store, y sincronizo el history del store con el de router
    const store = configureStore(initialState);

    // Render
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path='/login' exact component={Login} />
                    <PrivateRoute path='/published' exact render={(props) => <SectionList {...props} listType='published'/>}/>
                    <PrivateRoute path='/history' exact render={(props) => <SectionList {...props} listType='history'/>}/>
                    <PrivateRoute path='/advert/create' exact render={(props) => <Edit {...props} mode='create'/>}/>
                    <PrivateRoute path='/advert/edit/:productId' exact render={(props) => <Edit {...props} mode='edit'/>}/>
                    <PrivateRoute path='/profile' exact component={Profile} />
                    <Route path='/callback' exact component={Callback} />
                    <Route path='/advert/:productId' exact component={Detail} />
                    <Route path='/' exact component={Home} />
                    <Route component={Error404} />
                </Switch>
            </ConnectedRouter>
        </Provider>
    );
}