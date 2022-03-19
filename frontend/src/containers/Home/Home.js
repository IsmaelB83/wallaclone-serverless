// NPM Modules
import React, { useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
// Material UI
import Container from '@material-ui/core/Container';
// Components
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
        fetchAdverts()
        .catch (error => enqueueSnackbar(t('Error loading adverts ERROR', {error}), { variant: 'error' }));
    }, [fetchAdverts, enqueueSnackbar, t]);

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
                            adverts={adverts}
                            session={session}
                            isLoading={isFetching}
                        />
                    </div>
                </main>
            </Container>
            <Footer session={session} onLogout={props.logout} active='Home'/>
        </React.Fragment>
    );
}

export default withNamespaces()(Home);