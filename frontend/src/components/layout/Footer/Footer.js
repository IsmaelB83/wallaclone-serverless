// NPM Modules
import React from 'react';
import { Link } from 'react-router-dom';
// Material UI
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import ViewListIcon from '@material-ui/icons/ViewList';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import HomeIcon from '@material-ui/icons/Home';
import GitHubIcon from '@material-ui/icons/GitHub';
// Own components
// Assets
// CSS
import './styles.css';

// Componente NavBar
export default function Footer(props) {

    // Función traducción
    const { t, active } = props;
     
    // Render del componente
    return (
        <footer title='Wallaclone' className='Footer'>
            <Container>
            { props.session && props.session.user &&
                <div className='Footer__Menu'>
                    <MenuItem className={`Footer__MenuItem ${active==='Home'?'Footer__MenuItem--active':''}`} component={Link} to='/'>
                        <HomeIcon fontSize='small' />
                        <span>{t('Home')}</span>
                    </MenuItem>
                    <MenuItem className={`Footer__MenuItem ${active==='published'?'Footer__MenuItem--active':''}`} component={Link} to={'/published'}>
                        <ViewListIcon fontSize='small' />
                        <span>{t('My adverts')}</span>
                    </MenuItem>
                    <MenuItem className={`Footer__MenuItem ${active==='history'?'Footer__MenuItem--active':''}`} component={Link} to='/history'>
                        <TrendingUpIcon fontSize='small' />
                        <span>{t('Sold History')}</span>
                    </MenuItem>
                </div>
            }
            { ( !props.session || !props.session.user ) &&
                <div className='Footer__Content'>
                    <div className='SocialLinks'>
                        <a className='SocialLinks__link SocialLinks__link--github' href='https://github.com/IsmaelB83'><GitHubIcon /></a>
                        <a className='SocialLinks__link SocialLinks__link--linkedin' href='https://www.linkedin.com/in/ismael-bernal-10497a51/'><LinkedInIcon /></a>
                    </div>
                </div>
            }
            </Container>
        </footer>
    );
}