// Node
import React from 'react';
import PropTypes from 'prop-types';
// Material
import Avatar from '@material-ui/core/Avatar';
// Assets
// CSS
import './styles.css';

// Functional component to render an avatar
export default function CardAvatar (props) {

    const { avatar, name } = props;

    return (
        <div className={`CardAvatar CardAvatar--${props.size}`}>
            <div>
                <Avatar className='Avatar' alt='avatar' src={avatar} />
                <span>{name}</span>
            </div>
        </div>
    )
}

CardAvatar.propTypes = {
    login: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}