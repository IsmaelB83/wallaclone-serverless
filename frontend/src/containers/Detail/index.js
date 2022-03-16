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
        fetchAdvert: (slug) => dispatch(AdvertsActions.fetchAdvert(slug)),
        bookAdvert: (slug) => dispatch(AdvertsActions.bookAdvert(slug)),
        sellAdvert: (slug) => dispatch(AdvertsActions.sellAdvert(slug)),
        deleteAdvert: (slug) => dispatch(AdvertsActions.deleteAdvert(slug)),
    }
}

/**
 * Envuelvo el App en al función connect para conectar con el store recibido del provider
 */ 
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Detail));