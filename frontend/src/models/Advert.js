// Models

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
    userId: '',
    createdAt: undefined,
    productId: '',
    name: '',
    description: '',
    price: 0,
    type: ADVERT_CONSTANTS.TYPE.BUY,
    photoUrl: '',
    booked: false,
    sold: false,
    user: ''
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
        this.userId = ad.userId;
        this.createdAt = ad.createdAt;
        this.productId = ad.productId;
        this.booked = ad.booked;
        this.sold = ad.sold;
        this.price = ad.price;
        this.description = ad.description;
        this.name = ad.name;
        this.photoUrl = ad.photoUrl;
        this.type = ad.type;
        this.user = {
            userId: ad.userId,
            login: String(ad.userId).slice(-10),
            name: 'Ismael Bernal'
        };  
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