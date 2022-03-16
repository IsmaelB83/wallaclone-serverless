// Models
import User from './User';

// Constantes para el trabajo con el modelo de anuncio
export const ADVERT_CONSTANTS = {
    STATUS: {
        SOLD: 'sold',
        BOOKED: 'booked'
    },
    TYPE: {
        ALL: 'all',
        BUY: 'buy',
        SELL: 'sell'
    }
}

// Empty advert aux
export const EMPTY_ADVERT = {
    _id: '',
    slug: '',
    name: '',
    description: '',
    price: 0,
    type: ADVERT_CONSTANTS.TYPE.BUY,
    photo: '',
    booked: false,
    sold: false,
    createdAt: undefined,
}

/**
 * Modelo de anuncio en wallaclone
 */
export default class Advert {
    
    /**
     * Constructor
     * @param {Object} Advert 
     */    
    constructor(ad) {
        this._id = ad._id;
        this.slug = ad.slug;
        this.createdAt = ad.createdAt;
        this.name = ad.name;
        this.description = ad.description;
        this.price = ad.price;
        this.type = ad.type;
        this.photo = ad.photo;
        this.booked = ad.booked;
        this.sold = ad.sold;
        if (ad.user) {
            this.user = new User(ad.user);
        }        
    }

    /**
     * Comprueba si un objeto advert es válido. (Campos obligatorios completos)
     */
    isValid() {
        return  this.name && 
                this.description && 
                this.price > 0 && 
                this.type;
    }
}