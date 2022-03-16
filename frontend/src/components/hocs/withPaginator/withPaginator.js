// Node modules
import React from 'react';
// Material UI
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// Css
import './styles.css';

// Proporciona funcionalidad de paginado a cualquier lista de objetos
const withPaginator = (WrappedComponent) => {

    return function AdvertListWithPaginator(props) {

        // Destructuring props
        const { adverts } = props;
        let { currentPage, isLoading } = props;

        // Local variables
        const itemsPerPage=parseInt(process.env.REACT_APP_MAX_ADVERTS_UI);
        const numPages = Math.ceil(adverts.length/itemsPerPage);
        const minAdvert = currentPage * itemsPerPage;
        const maxAdvert = currentPage * itemsPerPage + itemsPerPage;

        // Next/Previous page
        const handleMovePaginator = increment => {
            currentPage += increment;
            if (currentPage > -1 && currentPage < numPages) {
                props.onSetCurrentPage(currentPage);
            }
        }

        // Previous page button
        const renderButtonBack = () => {
            let disableBack = !currentPage;
            return  <Button size='small' onClick={handleMovePaginator(-1)} 
                            disabled={disableBack} className='ButtonStandard ButtonStandard__Green'>
                        <KeyboardArrowLeft />
                    </Button>
        }

        // Next page button
        const renderButtonNext = () => {
            let disableNext = ( numPages <= currentPage + 1 );
            return  <Button size='small' onClick={handleMovePaginator(1)} 
                            disabled={disableNext} className='ButtonStandard ButtonStandard__Green'>
                        <KeyboardArrowRight />
                    </Button>
        }
       
        return (
            <React.Fragment>
                { adverts.length > 0 && !props.isLoading &&
                    <React.Fragment>
                        <div className='AdvertList__Paginator'>
                            <MobileStepper
                                className='Paginator'
                                variant='dots'
                                steps={numPages}
                                position='static'
                                activeStep={currentPage}
                                backButton={renderButtonBack()}
                                nextButton={renderButtonNext()}
                            />
                        </div>
                    </React.Fragment>
                }
                <WrappedComponent {...props} adverts={adverts.slice(minAdvert, maxAdvert || 1)} isLoading={isLoading}/> 
            </React.Fragment>
        ); 
    }
}

export default withPaginator;