// NPM Modules
import React from 'react';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import i18n from '../../../utils/i18n';
import PropTypes from 'prop-types';
// Material UI
// Own components
import ButtonIcon from '../../buttons/ButtonIcon';
import AdvertChip from '../../adverts/AdvertChip';
import CardImage from '../CardImage';
import CardAvatar from '../CardAvatar';
// Own modules
// Models
import Advert from '../../../models/Advert';
// Assets
// CSS
import './styles.css';


// Functional component to render an advert card
export default function CardList (props) {
    
    // Props destructuring
    const { slug, name, thumbnail, price, sold, type, booked, createdAt, user } = props.advert;
    const { onBookAdvert, onSellAdvert, onDeleteAdvert, onEditAdvert } = props;
    const { isMyAdvert } = props;

    // Render
    return(
        <React.Fragment>
            <article id={`adslug_${slug}`} className='CardList'>
                <header className='CardList__Header'>
                    <CardImage slug={slug} sold={sold} booked={booked} photo={thumbnail}/>
                    <p className='CardList__Price'>{price} €</p>
                    <AdvertChip type='type' value={type}/>
                </header>
                <div className='CardList__Body'>
                    <div className='CardList__Content'>
                        <Link to={`/advert/${slug}`} className='CardList__Title'><h2>{name}</h2></Link>
                        <Moment className='CardList__Date' locale={i18n.language} fromNow>{createdAt}</Moment>
                    </div>
                    <div className='CardList__Footer'>
                        { !isMyAdvert &&
                            <CardAvatar login={user.login} name={user.name} avatar={user.avatar}/>
                        } 
                        { isMyAdvert &&
                            <div className='CardList__Buttons'>
                                <ButtonIcon icon='book' disabled={sold} active={booked} onClick={onBookAdvert} />
                                <ButtonIcon icon='sell' disabled={booked} active={sold} onClick={onSellAdvert} />
                                <ButtonIcon icon='edit' disabled={sold} onClick={onEditAdvert}/>
                                <ButtonIcon icon='delete' disabled={sold} onClick={onDeleteAdvert} />
                            </div>
                        }
                    </div>
                </div>
            </article>
        </React.Fragment>
    );
}

CardList.propTypes = {
  advert: PropTypes.instanceOf(Advert).isRequired,
  onBookAdvert: PropTypes.func,
  onSellAdvert: PropTypes.func,
  onDeleteAdvert: PropTypes.func,
  onEditAdvert: PropTypes.func,
  isMyAdvert: PropTypes.bool
}