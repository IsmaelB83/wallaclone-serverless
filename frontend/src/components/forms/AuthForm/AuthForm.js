// NPM Modules
import React from 'react';
import { Link } from 'react-router-dom';
// Material UI
import Button from '@material-ui/core/Button';
// Own components
import Form from '../Form';
// Models
// Own modules
// Assets
import imageLogo from '../../../assets/images/logo_large.png';
import imageSpinner from '../../../assets/images/spinner.gif';
import imageAuth0 from '../../../assets/images/auth0.png';
// CSS
import './styles.css';

// Componente para renderizar cualquiera de los formularios de la sección de autenticación:
export default function AuthForm(props) {  
    // Props destructuring
    const { t, onSubmit } = props;
    // Method submit login
    const submit = (inputs) => onSubmit(inputs);
    // Render
    return (
        <div className='Login'>
            <div className='Login__Wrapper'>
                <Form className='Login__Form' onSubmit={submit}>
                    <Link to='/'>
                        <div className='Login__ImageWrapper'>
                            <img src={imageLogo} className='Login__Logo' alt='wallaclone-logo' />
                        </div>
                    </Link>
                    <div>
                      <div className='Login__Buttons'>
                          <Button className='Button' type='submit' variant='contained' color='primary'>{t('Login with Auth0')}</Button>
                      </div>
                    </div>
                    <div>
                        <div className='Login__ImageWrapper'>
                            <img src={imageAuth0} className='Login_Auth0' alt='auth0-logo' />
                        </div>
                    </div>
                    <div className='LoadingSmall'>
                    { props.isLoading && <img src={imageSpinner} className='LoadingSmall__Spinner' alt='spinner'/> }
                    </div>
                </Form>
            </div>
        </div>
    );
}