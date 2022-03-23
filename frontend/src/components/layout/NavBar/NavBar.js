// NPM Modules
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
// Material UI
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import LanguageIcon from '@material-ui/icons/Language';
// Own components
import HideOnScrollDown from '../../utils/HideOnScrollDown';
// Own modules
import i18n from '../../../utils/i18n';
// Assets
import imageLogoXs from '../../../assets/images/logo.png';
import imageLogoLg from '../../../assets/images/logo_large.png';
import imageAvatar from '../../../assets/images/user.png'
// CSS
import './styles.css';

// Componente NavBar
export default function NavBar(props) {

    // Props destructuring
    const { t, onLogout } = props;
    const { session } = props;

    // Ocultar navbar
    const hide = HideOnScrollDown();

    // Switch language
    const [language, setLanguage] = useState(i18n.language);
    const switchLanguage = () => {
        const aux = language==='en'?'es':'en';
        i18n.changeLanguage(aux);
        moment.locale(aux);
        setLanguage(aux);
    }

    // Render del componente
    return (
        <nav className={`NavBar NavBar--${hide?'hide':'show'}`}>
            <Container>
                <Toolbar className='NavBar__Toolbar'>
                    <Link to='/' className='NavBar__Brand'>
                        <img src={imageLogoXs} className='NavBar__Brand--Xs' alt='logo'/>
                        <img src={imageLogoLg} className='NavBar__Brand--Lg' alt='logo'/>
                    </Link>
                    <div className='NavBar__Right'>
                        <MenuItem className='Navbar__MenuItem' onClick={switchLanguage}>
                            <LanguageIcon fontSize='small' />
                            <span>{language==='en'?'es':'en'}</span>
                        </MenuItem>
                        { session.login && 
                            <React.Fragment>
                                <MenuItem className='Navbar__MenuItem' component={Link} to='/advert/create' disabled={session.completeProfile}>
                                    <AddPhotoAlternateIcon fontSize='small'/>
                                    <span>{t('add')}</span>
                                </MenuItem>
                                <MenuItem className='Navbar__MenuItem' component={Link} to='/profile'>
                                    <Avatar className='Avatar' alt='avatar' src={session.avatar || imageAvatar}/>
                                    <span>{t('profile')}</span>
                                </MenuItem>
                                <MenuItem className='Navbar__MenuItem' onClick={onLogout}>
                                    <ExitToAppIcon fontSize='small' />
                                    <span>{t('logout')}</span>
                                </MenuItem>
                            </React.Fragment>
                        }
                        { !session.login &&
                            <MenuItem className='Navbar__MenuItem' component={Link} to='/login'>
                                <PermIdentityIcon fontSize='small' />
                                <span>{t('login')}</span>
                            </MenuItem>
                        }
                    </div>
                </Toolbar>
            </Container>
        </nav>
    );
}