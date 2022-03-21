// Node modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
// Own components
import Detail from './Detail';
// Own modules
import { AdvertsActions, SessionActions } from '../../store/GlobalActions';


/**
 * Inyecta props en mi componente para acceder al state del store
 * @param {Object} state Estado de mi store
 */
const mapStateToProps = (state) => {
    return {
        session: state.session,
        isFetching: state.ui.isFetching,
        isUpdating: state.ui.isUpdating,
        isDeleting: state.ui.isDeleting,
        error: state.ui.error
    }
}

/**
 * Inyecta props en mi componente para acceder a los reducers del store
 * @param {Function} dispatch Dispatch del store
 */
const mapDispatchToProps = (dispatch) => {
    return {
        // Session
        logout: () => dispatch(SessionActions.logout()),
        // Adverts
        fetchAdvert: (productId, userId) => dispatch(AdvertsActions.fetchAdvert(productId, userId)),
        bookAdvert: (productId) => dispatch(AdvertsActions.bookAdvert(productId)),
        sellAdvert: (productId) => dispatch(AdvertsActions.sellAdvert(productId)),
        deleteAdvert: (productId) => dispatch(AdvertsActions.deleteAdvert(productId)),
    }
}

/**
 * Envuelvo el App en al función connect para conectar con el store recibido del provider
 */ 
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Detail));