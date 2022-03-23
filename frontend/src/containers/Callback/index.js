// NPM modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
// Own components
import Callback from './Callback';
// Own modules
import { SessionActions } from '../../store/GlobalActions';


/**
 * Inyecta props en mi componente para acceder al state del store
 * @param {Object} state Estado de mi store
 */
const mapStateToProps = (state) => {
    return {
    }
}

/**
 * Inyecta props en mi componente para acceder a los reducers del store
 * @param {Function} dispatch Dispatch del store
 */
const mapDispatchToProps = (dispatch) => {
    return {
        loginRedirect: () => dispatch(SessionActions.loginRedirect())
    }
}

// Retorno el componente envuelto en el "connect" y en un withSnackBar (para los mensajes de info de la app)
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Callback));