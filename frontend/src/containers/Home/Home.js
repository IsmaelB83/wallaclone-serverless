// NPM Modules
import React, { useEffect, useState } from 'react';
import { withNamespaces } from 'react-i18next';
// Material UI
import Container from '@material-ui/core/Container';
// Components
import ModalConfirm from '../../components/modals/ModalConfirm';
import AdvertList from '../../components/adverts/AdvertList';
import Footer from '../../components/layout/Footer';
import NavBar from '../../components/layout/NavBar';
// Containers
// Own modules
// Assets
// CSS
import './styles.css';

// Main component
function Home(props) {
  
    // Translate
    const { t } = props;

    // Destructuring de props
    const { currentPage, isFetching } = props.ui;
    const { adverts, session } = props;
    const { setCurrentPage, enqueueSnackbar, fetchAdverts } = props;

    // On load
    useEffect(() => { 
        // Mostrar modal de completar perfil
        if (session.jwt && session.completeProfile) {
            console.log('mostrar modal')
            setShowModalCompleteProfile(true)
        }
        // Obtener anuncios       
        fetchAdverts()
        .catch (error => enqueueSnackbar(t('Error loading adverts ERROR', {error}), { variant: 'error' }));
    }, [fetchAdverts, enqueueSnackbar, session, t]);

    // Show modal to request profile complete
    const [showModalCompleteProfile, setShowModalCompleteProfile] = useState(false);
    const confirmModalCompleteProfile = () => {
        setShowModalCompleteProfile(false);
        props.history.push('/profile')
        console.log(props)
    };
    const cancelModalCompleteProfile = () => {
        setShowModalCompleteProfile(false);
    };
    
    // Render
    return (
        <React.Fragment>
            <NavBar session={session} onLogout={props.logout}/>
            <Container className='Container'>
                <main className='Section__Wrapper'>
                    <div className='Home__Results'>
                        <AdvertList 
                            type='tiles' 
                            currentPage={currentPage}
                            onSetCurrentPage={setCurrentPage}
                            adverts={adverts}
                            session={session}
                            isLoading={isFetching}
                        />
                    </div>
                </main>
                {   showModalCompleteProfile && 
                    <ModalConfirm   onConfirm={confirmModalCompleteProfile} 
                                    onCancel={cancelModalCompleteProfile} 
                                    visible={true} type='warning'
                                    title={t('You need to complete your profile before being able to register new adverts')}
                    /> 
                }
            </Container>
            <Footer session={session} onLogout={props.logout} active='Home'/>
        </React.Fragment>
    );
}

export default withNamespaces()(Home);