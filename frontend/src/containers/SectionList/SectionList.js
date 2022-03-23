// NPM Modules
import React, { useState, useEffect } from 'react';
// Material UI
import Container from '@material-ui/core/Container';
// Components
import ModalConfirm from '../../components/modals/ModalConfirm';
import AdvertList from '../../components/adverts/AdvertList';
import HeaderPublished from '../../components/headers/HeaderPublished';
import HeaderHistory from '../../components/headers/HeaderHistory';
import Footer from '../../components/layout/Footer';
import NavBar from '../../components/layout/NavBar';
import Loading from '../../components/utils/Loading';
// Own modules
// Models
// Assets
// CSS

// Section with a list of adverts
export default function SectionList (props) {
    
    // Translate
    const { t } = props;

    // Destructure props
    const { enqueueSnackbar, 
            fetchSoldHistory, fetchUserAdverts, setCurrentPage, 
            bookAdvert, sellAdvert, deleteAdvert, logout } = props;
    const { currentPage, isFetching, isUpdating, isDeleting } = props.ui;
    const { adverts, session, history, listType } = props;

    // Cargo anuncios del usuario solicitado
    useEffect(() => {
        switch (listType) {
            case 'history':
                fetchSoldHistory()
                .catch(error => enqueueSnackbar(t('Error loading history ERROR', { error }), { variant: 'error' }));
                break;
            case 'published':
                fetchUserAdverts()
                .catch(error => enqueueSnackbar(t('Error loading adverts ERROR', { user:error }), { variant: 'error' }));
                break;
            default:
                break;
        }
    }, [listType, fetchSoldHistory, fetchUserAdverts, enqueueSnackbar, session, t]);

    // Reservado
    const bookAdvertHandler = productId => {
        bookAdvert(productId).catch(error => enqueueSnackbar(t('Error setting advert as booked ERROR', {error}), { variant: 'error' }));
    };

    // Vendido
    const sellAdvertHandler = productId => {
        sellAdvert(productId).catch(error => enqueueSnackbar(t('Error setting advert as sold ERROR', {error}), { variant: 'error', }));
    };

    // Edit Advert
    const editAdvertHandler = productId => history.push(`/advert/edit/${productId}?userId=${session.userId}`);

    // Borrar anuncio
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [productId, setProductId] = useState(undefined);
    const deleteAdvertRequestHandler = productId => {
        setProductId(productId)
        setShowModalDelete(true);
    }
    const confirmDeleteAdvert = () => {
        setShowModalDelete(false);
        if (productId) {
            deleteAdvert(productId)
            .then(res => enqueueSnackbar(t('Advert X deleted', {id: productId}), { variant: 'success', }))
            .catch(error => enqueueSnackbar(t('Error deleting advert ERROR', {error}), { variant: 'error', }));    
        } else {
            enqueueSnackbar(t('Error identifying advert to be deleted'), { variant: 'error', });    
        }
    };
    const cancelDeleteAdvert = () => {
        setProductId(undefined)
        setShowModalDelete(false);
    };
   
    // Render
    return (
        <React.Fragment>
            <NavBar session={session} onLogout={logout}/>
            <Container className='Container'>
                <main className='Section__Wrapper'>
                    { HeaderSection(listType, adverts.length) }
                    { isUpdating && <Loading text={t('Trying to edit advert...')}/> }
                    { isDeleting && <Loading text={t('Trying to delete advert...')}/> }
                    <AdvertList 
                        type='list' 
                        currentPage={currentPage}
                        onSetCurrentPage={setCurrentPage}                        adverts={adverts}
                        session={session}
                        isLoading={isFetching}
                        onBookAdvert={bookAdvertHandler}
                        onSellAdvert={sellAdvertHandler}
                        onDeleteAdvert={deleteAdvertRequestHandler}
                        onEditAdvert={editAdvertHandler}
                    />
                </main>
                {   showModalDelete && 
                    <ModalConfirm   onConfirm={confirmDeleteAdvert} 
                                    onCancel={cancelDeleteAdvert} 
                                    visible={true} type='warning'
                                    title={t('Are you sure to delete the advert?')}
                    /> 
                }
            </Container>
            <Footer session={session} onLogout={logout} active={listType}/>
        </React.Fragment>
    );
}

function HeaderSection(listType, totalCount) {
    switch (listType) {
        case 'published':
            return <HeaderPublished totalCount={totalCount}/>;
        case 'history':
            return <HeaderHistory totalCount={totalCount}/>;
        default:
            return null;
    }
  }