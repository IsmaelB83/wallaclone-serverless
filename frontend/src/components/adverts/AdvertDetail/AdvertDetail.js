// NPM Modules
import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
// Material UI
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
// Own Components
import AdvertChip from '../AdvertChip';
import CardImage from '../../cards/CardImage';
// Own Modules
import i18n from '../../../utils/i18n';
// Models
import Advert from '../../../models/Advert';
// Components
// Assets
// CSS
import './styles.css';

// Component to display an advert
export default function AdvertDetail(props) {

    // Props destructuring
    const { productId, name, description, photoUrl, price, sold, booked, type, createdAt, userId, user } = props.advert;
    const { onBookAdvert, onSellAdvert, onDeleteAdvert, t } = props;
    const { ownAdvert } = props;
    const url = `/advert/edit/${productId}?userId=${userId}`
    
    // Render
    return (
        <article id={`adslug_${productId}`} className='AdvertDetail'>
            <div className='AdvertDetail__Photo'>
                <div className='AdvertDetail__PhotoWrapper'>
                    <CardImage productId={productId} sold={sold} booked={booked} photo={photoUrl} url={url} detail={true}/>
                </div>
                <div className='AdvertDetail__ShareSocial'>
                    <FacebookShareButton url={window.location.href} quote={name}>
                        <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
                    <TwitterShareButton url={window.location.href} title={name}>
                        <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>
                    <WhatsappShareButton url={window.location.href}>
                        <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>
                </div>
            </div>
            <div className='AdvertDetail__Content'>
                <AdvertChip type='type' value={type}/>
                <div>
                    <h1 className='AdvertDetail__Title'>{name}</h1>
                    <Moment className='AdvertDetail__Date' locale={i18n.language} fromNow>{createdAt}</Moment>
                </div>
                <p className='AdvertDetail__Description'>{description}</p>
                <div className='AdvertDetail__Footer'>
                    <div className='AdvertDetail__AuthorAvatar'>
                        <Link to={`/published/${user.login}`} className=''>
                            <div>
                                <Avatar className='Avatar' alt='avatar' src={user.avatar}/>
                                <span className='AdvertDetail__Author'>{user && user.name}</span>
                            </div>
                        </Link>
                    </div>
                    <p className='AdvertDetail__Price'>{price} <span>€</span></p>
                </div>
            </div>
            <div className='AdvertDetail__Buttons'>
                {   ownAdvert && 
                    <React.Fragment>
                        <Button className='ButtonStandard ButtonStandard__Green Span2'
                                startIcon={<EditIcon />} 
                                component={Link} 
                                to={url}
                                disabled={booked || sold}>
                                {t('Edit')}
                        </Button>
                        <Button className='ButtonStandard ButtonStandard__Green' 
                                onClick={onBookAdvert}
                                startIcon={<BookmarkBorderOutlinedIcon/>}
                                disabled={sold}>
                                {t(booked?'BookCancel':'Book')}
                        </Button>
                        <Button className='ButtonStandard ButtonStandard__Green' 
                                onClick={onSellAdvert}
                                startIcon={<AttachMoneyOutlinedIcon/>}
                                disabled={booked}>
                                {t(sold?'SoldCancel':'Sold')}
                        </Button>
                        <Button className='ButtonStandard ButtonStandard__Red Span2' 
                                onClick={onDeleteAdvert}
                                startIcon={<DeleteOutlineOutlinedIcon/>}
                                disabled={booked || sold}>
                                {t('Delete')}
                        </Button>
                    </React.Fragment>
                }
                
            </div>
        </article>
    );
}

AdvertDetail.propTypes = {
  advert: PropTypes.instanceOf(Advert).isRequired,
  onBookAdvert: PropTypes.func.isRequired,
  onSellAdvert: PropTypes.func.isRequired,
  onDeleteAdvert: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  ownAdvert: PropTypes.bool,
  error: PropTypes.string,
}