// NPM Modules
import React from 'react';
// Material UI
// Own components
// Models
// Own modules
// Assets
// CSS
import '../styles.css';


// Header history section
export default function HeaderHistory(props) {
    // Props destructuring
    const { t, totalCount } = props;
    // Render
    return (
        <div className='Section__Header'>
            <div className='Content__Title'>
                <h1 className='Title'>{t('Your sales')}</h1>
                <p className='Counter'><span>{totalCount}</span> {t('products')}</p>
            </div>
            <p className='Text'>{t('Here you can follow up all the products that you have sold')}</p>
        </div>
    );
}