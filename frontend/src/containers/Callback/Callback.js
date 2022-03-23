// NPM Modules
import React, { useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
// Material UI
// Own Components
import RedirectForm from '../../components/forms/RedirectForm';
// Containers
// Own modules
// Assets
// CSS

// Main component
function Callback(props) {
  
    // Props destructuring
    const { t, loginRedirect, enqueueSnackbar } = props;
    const { location } = props;

    // On load
    useEffect(() => {
        if (location.hash) {
            loginRedirect()
            .then(res => enqueueSnackbar(t('Ok. Redirect home...'), { variant: 'info' }))
            .catch(error => enqueueSnackbar(error, { variant: 'error', }));
        }
    }, [location, enqueueSnackbar, loginRedirect, t]);

    // Render
    return (
        <RedirectForm/>
    );
}

export default withNamespaces()(Callback);