// NPM Modules
import React from 'react';
// Material UI
import Container from '@material-ui/core/Container';
// Own components
import Error from '../../components/error/Error';
import NavBar from '../../components/layout/NavBar';
import Footer from '../../components/layout/Footer';
// Assets
// CSS
import './styles.css';

/**
 * Functional component to render 404 error
 */
export default function Error404(props) {

    // Props destructuring
    const { session, logout } = props;

    // Render
    return (
        <React.Fragment>
            <NavBar session={session} onLogout={logout}/>
            <Container className='Container'>
                <Error type='404'/>
            </Container>
            <Footer session={session} onLogout={logout}/>
        </React.Fragment>
    );
}