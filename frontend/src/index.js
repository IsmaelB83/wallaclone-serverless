// NPM Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
// Material UI
// Components
import ErrorBoundary from './components/error/ErrorBoundary';
import App from './containers/App';
// Own modules
import './utils/i18n';
import 'moment/locale/es';
import 'moment/locale/en-gb';
// Assets
// CSS
import './index.css';

// Render
const reactComp =   <ErrorBoundary>
                        <SnackbarProvider maxSnack={1} autoHideDuration={1000}>
                            <App/>
                        </SnackbarProvider>
                    </ErrorBoundary>

ReactDOM.render(reactComp, document.getElementById('root'));