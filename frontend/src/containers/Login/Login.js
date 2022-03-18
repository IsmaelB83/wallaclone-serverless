// NPM Modules
import React from 'react';
import { withNamespaces } from 'react-i18next';
// Material UI
// Own components
import AuthForm from '../../components/forms/AuthForm';
// Models
// Own modules
// Assets

// Login
function Login(props) {
    
    // Translate
    const { t } = props;
    // Props destructuring
    const { enqueueSnackbar } = props;
      
    // Dispatch login action
    const submitLogin = (inputs) => {
        props.loginRequest()
        .then(res => enqueueSnackbar(t('Redirecting auth0...'), { variant: 'info' }))
        .catch(error => enqueueSnackbar(error, { variant: 'error', }));
    }
    
    // Render
    return (
        <AuthForm 
            form='login'
            isLoading={props.isAuthenticating} 
            onSubmit={submitLogin}
        />
    );
}

export default withNamespaces()(Login);