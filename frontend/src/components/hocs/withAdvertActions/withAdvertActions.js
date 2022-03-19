// Node
import React, { Component } from 'react';

const withAdvertActions = (WrappedComponent) => {

    // Composed component
    return class AdvertWithActions extends Component {

        // Acciones posibles sobre el anuncio
        sellAdvert = () => this.props.onSellAdvert(this.props.advert.productId);
        bookAdvert = () => this.props.onBookAdvert(this.props.advert.productId);
        deleteAdvert = () => this.props.onDeleteAdvert(this.props.advert.productId);
        editAdvert = () => this.props.onEditAdvert(this.props.advert.productId);

        render() { 
            return <WrappedComponent 
                        {...this.props} 
                        onSellAdvert={this.sellAdvert}
                        onBookAdvert={this.bookAdvert}
                        onDeleteAdvert={this.deleteAdvert}
                        onEditAdvert={this.editAdvert}
                    /> 
        }
    }
}

export default withAdvertActions;
