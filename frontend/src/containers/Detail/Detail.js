// NPM Modules
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import queryString from 'query-string';
// Material UI
import Container from '@material-ui/core/Container';
// Components
import AdvertDetail from '../../components/adverts/AdvertDetail';
import ModalConfirm from '../../components/modals/ModalConfirm';
import Loading from '../../components/utils/Loading';
import HeaderAdvertDetail from '../../components/headers/HeaderAdvertDetail';
import NavBar from '../../components/layout/NavBar';
import Footer from '../../components/layout/Footer';
import Error from '../../components/error/Error';
// Own Modules
// Models
// Assets
// CSS
import './styles.css';


// Advert detail container
function Detail(props) {

    // Translate 
    const { t, session } = props;

    // Propiedades del index
    const { fetchAdvert, enqueueSnackbar } = props;
    const { productId } = props.match.params;
    const { userId } = queryString.parse(props.location.search);

    // Load advert from API
    const [advert, setAdvert] = useState();
    useEffect(() => {
        fetchAdvert(productId, userId)
        .then (advert => setAdvert(advert))
        .catch(error => enqueueSnackbar(t('Error loading advert ERROR', {error}), { variant: 'error' }));
    }, [productId, userId, enqueueSnackbar, fetchAdvert, t]);

    // Marcar como vendido un anuncio
    const setSellAdvert = () => {
        props.sellAdvert(advert.productId)
        .then (ad => setAdvert({...advert, sold: ad.sold, booked: ad.booked,}))
        .catch(error => enqueueSnackbar(t('Error setting advert as sold ERROR', {error}), { variant: 'error' }));
    }

    // Marcar como reservado un anuncio
    const setBookAdvert = () => {
        props.bookAdvert(advert.productId)
        .then (ad => setAdvert({...advert, booked: ad.booked, sold: ad.sold}))
        .catch(error => enqueueSnackbar(t('Error setting advert as booked ERROR', {error}), { variant: 'error' }));
    }

    // Borrar anuncio
    const [showModalDelete, setShowModalDelete] = useState(false);
    const deleteAdvertRequest = () => {
        setShowModalDelete(true);
    }
    const confirmDeleteAdvert = () => {
        setShowModalDelete(false);
        if (productId) {
            props.deleteAdvert(productId)
            .then(res => enqueueSnackbar(t('Advert X deleted', {id: productId}), { variant: 'success', }))
            .catch(error => enqueueSnackbar(t('Error deleting advert ERROR', {error}), { variant: 'error', }));    
        } else {
            enqueueSnackbar(t('Error identifying advert to be deleted'), { variant: 'error', });    
        }
    };
    const cancelDeleteAdvert = () => {
        setShowModalDelete(false);
    };

    // Render
    return (
        <React.Fragment>
            <NavBar session={session} onLogout={props.logout}/>
            <Container className='Container'>
                <main className='Section__Wrapper Detail'>
                    <HeaderAdvertDetail/>
                    { !props.isFetching && advert && 
                        <AdvertDetail
                            advert={advert}
                            isLogin={session.userId !== undefined}
                            ownAdvert={advert.userId === session.userId}
                            onSellAdvert={setSellAdvert}
                            onBookAdvert={setBookAdvert}
                            onDeleteAdvert={deleteAdvertRequest}
                        />
                    }
                { props.error && <Error error={props.error}/>}
                { props.isFetching && <Loading text={t('Loading advert')}/> }
                </main>
                {   showModalDelete && 
                    <ModalConfirm   onConfirm={confirmDeleteAdvert} 
                                    onCancel={cancelDeleteAdvert} 
                                    visible={true} type='warning'
                                    title={t('Are you sure to delete the advert?')}
                    /> 
                }
            </Container>
            <Footer session={session} onLogout={props.logout}/>
        </React.Fragment>
    );
}

AdvertDetail.propTypes = {
    isUpdating: PropTypes.bool,
    error: PropTypes.string,
}

export default withNamespaces()(Detail);