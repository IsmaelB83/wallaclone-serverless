// NPM Modules
import React from 'react';
import { withNamespaces } from 'react-i18next';
// Material UI
import Container from '@material-ui/core/Container';
// Components
import HeaderProfile from '../../components/headers/HeaderProfile';
import ProfileForm from '../../components/forms/ProfileForm';
import Loading from '../../components/utils/Loading';
import NavBar from '../../components/layout/NavBar';
import Footer from '../../components/layout/Footer';
// Models
// Own modules
// Assets
// CSS
import './styles.css';

// Profile
function Profile(props) {

    // Translate 
    const { t, editUser, enqueueSnackbar, logout } = props;
    const { session, isUpdating, isUploadingImage } = props;

    // Submit (save data)
    const submitProfile = inputs => {
      // Creo usuario desde inputs
      const { email, name, login, file } = inputs;
      // Dispatch update user
      editUser({email, name, login}, file)
        .then (res => enqueueSnackbar(t('User updated successfully'), { variant: 'success' }))
        .catch (error => enqueueSnackbar(t('Error updating user data ERROR', {error}), { variant: 'error', }));
    }

    // Render
    return (
        <React.Fragment>
            <NavBar session={session} onLogout={logout}/>
            <Container className='Container'>
                <main className='Section__Wrapper Profile'>
                    <HeaderProfile/>
                    { isUpdating && <Loading text={t('Updating user data...')}/> }
                    { isUploadingImage && <Loading text={t('Trying to upload image...')}/> }
                    <ProfileForm    noValidate 
                                    autoComplete='off' 
                                    className='Profile__Form'
                                    user={session}
                                    onSubmit={submitProfile}/>
                </main>
            </Container>
            <Footer session={session} onLogout={logout}/>
        </React.Fragment>
    );
}

export default withNamespaces()(Profile);