// NPM Modules
import React from 'react';
import { Link } from "react-router-dom";
// Material UI
import Button from '@material-ui/core/Button';
// Own components
// Models
// Own modules
// Assets
// CSS
import '../styles.css';


// Header published section
export default function HeaderPublished(props) {
    return (
        <div className='Section__Header'>
            <div className='Content__Title'>
                <h1 className='Title'>{props.t('Your Products')}</h1>
                <p className='Counter'><span>{props.totalCount}</span> {props.t('products')}</p>
            </div>
            <React.Fragment>
                <p className='Text'>{props.t('In this section you can manage MORE')}</p>
                <Button className='Button__AddProduct' variant='contained' color='primary' component={Link} to='/advert/create'>
                    {props.t('Add product')}
                </Button>
            </React.Fragment>
        </div>
    );
}