// NPM Modules
import Axios from 'axios';
// Material UI
// Own modules
import Advert from '../models/Advert';
// Assets
// CSS

// Endpoint
const API_URL = `${process.env.REACT_APP_API_URL}/products`;

/**
* Objeto API
*/
export default {
    
    /**
    * Obtener un anuncio por su productId
    */
    getAdvert: (productId, userId) => {
        // Call endpoint and return
        const aux = String(userId).replace('|','%7C')
        return Axios.get(`${API_URL}/${productId}?userId=${aux}`)
        .then(res => new Advert(res.data.Item));
    },
    
    /**
    * Obtener todos los anuncios
    */
    getAdverts: () => {
        // Call endpoint and return
        return Axios.get(`${API_URL}`)
        .then(res => {
            return {
                adverts:  res.data.Items.map(advert => new Advert(advert))
            }
        });
    },
    
    /**
    * Returns all adverts for a specific user
    */
    userAdverts: jwt => {
        // Headers for authenticated endpoint
        const config  = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        }
        // Call endpoint and return
        return Axios.get(`${API_URL}/active`, config)
        .then(res => {
            return {
                adverts: res.data.Items.map(advert => new Advert(advert))
            }
        });
    },
    
    /**
    * Returns all sales adverts for a specific user
    */
    soldHistory: jwt => {
        // Headers for authenticated endpoint
        const config  = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        }
        // Call endpoint and return
        return Axios.get(`${API_URL}/sold`, config)
        .then(res => {
            return {
                adverts: res.data.Items.map(advert => new Advert(advert))
            }
        });
    },
    
    /**
    * Llama a la API para crear un nuevo anuncio
    * @param {Advert} advert 
    */
    postAdvert: (advert, jwt) => {
        // Advert data
        const data = {
            name: advert.name,
            description: advert.description,
            price: advert.price,
            type: advert.type,
            //photoUrl: photoUrl
        }
        // Headers for authenticated endpoint
        const config  = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        }
        // Call endpoint and return
        return Axios.post(`${API_URL}`, data, config)
        .then(res => new Advert(res.data.Item));
    },
    
    /**
    * Llama a la API para editar un anuncio
    * @param {Advert} advert 
    */
    editAdvert: (advert, jwt) => {
        // Form Data
        const data = {
            name: advert.name,
            description: advert.description,
            price: advert.price,
            type: advert.type,
            //photoUrl: photoUrl
        }
        // Headers for authenticated endpoint
        const config  = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        }
        // Call endpoint and return
        return Axios.patch(`${API_URL}/${advert.productId}`, data, config)
        .then(res => new Advert(res.data.Item));
    },
    
    /**
    * Llama a la API para marcar un anuncio como reservado
    * @param {Advert} advert 
    */
    bookAdvert: (productId, jwt) => {
        // Headers for authenticated endpoint
        const config  = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        }
        // Call endpoint and return
        return Axios.patch(`${API_URL}/${productId}/book`, null, config)
        .then(res => new Advert(res.data.Item));
    },
    
    /**
    * Llama a la API para marcar un anuncio como reservado
    * @param {Advert} advert 
    */
    sellAdvert: (productId, jwt) => {
        // Headers for authenticated endpoint
        const config  = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        }
        // Call endpoint and return
        return Axios.patch(`${API_URL}/${productId}/sold`, null, config)
        .then(res => new Advert(res.data.Item));
    },
    
    /**
    * Llama a la API para editar un anuncio
    * @param {Advert} advert 
    */
    deleteAdvert: (productId, jwt) => {
        // Headers for authenticated endpoint
        const config  = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        }
        // Call endpoint and return
        return Axios.delete(`${API_URL}/${productId}`, config)
        .then(res => res.data);
    }
}