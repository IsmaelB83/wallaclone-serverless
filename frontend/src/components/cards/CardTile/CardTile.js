// NPM Modules
import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import i18n from '../../../utils/i18n';
import { Link } from "react-router-dom";
// Material UI
// Own components
import AdvertChip from '../../adverts/AdvertChip';
import CardAvatar from '../CardAvatar';
import CardImage from '../CardImage';
// Own modules
// Models
import Advert from '../../../models/Advert';
// Assets
// CSS
import './styles.css';


// Functional component to render an advert card
export default function CardTile (props) {

    // Props destructuring
    const { slug, name, thumbnail, price, sold, booked, type, user, createdAt } = props.advert;

    // Render
    return(
        <article id={`adslug_${slug}`} className='CardTile'>
            <header className='CardTile__Header'>
                <p className='CardTile__Price'>{price} <span className='CardTile__Currency'>€</span></p>
                <CardImage slug={slug} sold={sold} booked={booked} photo={thumbnail}/>
            </header>
            <div className='CardTile__Content'>
                <div className='CardTile__ContentType'>
                    <AdvertChip type='type' value={type}/>
                </div>                
                <div className='CardTile_ContentTitle'>
                    <Link to={`/advert/${slug}`} className='CardTile__Title'><h2>{name}</h2></Link>
                </div>
            </div>
            <div className='CardTile__Footer'>
                <CardAvatar login={user.login} name={user.name} avatar={user.avatar}/>
                <Moment className='CardTile__Date' locale={i18n.language} fromNow>{createdAt}</Moment>
            </div>
        </article>
    );
}

CardTile.propTypes = {
    advert: PropTypes.instanceOf(Advert).isRequired,    
}