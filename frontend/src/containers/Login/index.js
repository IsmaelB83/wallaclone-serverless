// NPM modules
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
// Own components
import Login from './Login';
// Own modules
import { SessionActions } from '../../store/GlobalActions';


/**
 * Inyecta props en mi componente para acceder al state del store
 * @param {Object} state Estado de mi store
 */
const mapStateToProps = (state) => {
    return {
        isAuthenticating: state.ui.isAuthenticating,
    }
}

/**
 * Inyecta props en mi componente para acceder a los reducers del store
 * @param {Function} dispatch Dispatch del store
 */
const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: () => dispatch(SessionActions.loginRequest())
    }
}

// Retorno el componente envuelto en el "connect" y en un withSnackBar (para los mensajes de info de la app)
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Login));