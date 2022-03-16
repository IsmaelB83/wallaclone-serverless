// Node modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { withNamespaces } from 'react-i18next';
// Own Components
import Home from './Home';
// Own modules
import { AdvertsActions, SessionActions } from '../../store/GlobalActions';


/**
 * Inyecta props en mi componente para acceder al state del store
 * @param {Object} state Estado de mi store
 */
const mapStateToProps = (state) => {
    return {
        adverts: state.adverts,
        session: state.session,
        ui: state.ui
    }
}

/**
 * Inyecta props en mi componente para acceder a los reducers del store
 * @param {Function} dispatch Dispatch del store
 */
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(SessionActions.logout()),
        fetchAdverts: () => dispatch(AdvertsActions.fetchAdverts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withNamespaces()(Home)));