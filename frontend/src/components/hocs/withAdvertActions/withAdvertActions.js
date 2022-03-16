// Node
import React, { Component } from 'react';

const withAdvertActions = (WrappedComponent) => {

    // Composed component
    return class AdvertWithActions extends Component {

        // Acciones posibles sobre el anuncio
        sellAdvert = () => this.props.onSellAdvert(this.props.advert.slug);
        bookAdvert = () => this.props.onBookAdvert(this.props.advert.slug);
        deleteAdvert = () => this.props.onDeleteAdvert(this.props.advert.slug);
        editAdvert = () => this.props.onEditAdvert(this.props.advert.slug);

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
