// NPM Modules
import React, { useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
// Material UI
// Own Components
import AuthForm from '../../components/forms/AuthForm';
// Containers
// Own modules
// Assets
// CSS

// Main component
function Callback(props) {
  
    // Translate
    const { t } = props;
    // Props destructuring
    const { location,  } = props;
    const { loginRedirect, enqueueSnackbar } = props;

    // On load
    useEffect(() => {
        if (location.hash) {
            loginRedirect(location.hash)
            .then(res => enqueueSnackbar(t('Redirecting home...'), { variant: 'info' }))
            .catch(error => enqueueSnackbar(error, { variant: 'error', }));
        }
    }, [location, enqueueSnackbar, loginRedirect, t]);

    // Render
    return (
        <AuthForm 
            form='login'
            isLoading={props.isAuthenticating} 
        />
    );
}

export default withNamespaces()(Callback);