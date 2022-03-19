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
    * Obtener un anuncio por su productId
    */
    getAdvert: (productId, userId) => {
        // Call endpoint and return
        return Axios.get(`${API_URL}/${productId}?userId=${userId}`)
        .then(res => new Advert(res.data.Item));
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
        return Axios.get(`${API_URL}/sold`, config)
        .then(res => res.data.Items.map(advert => new Advert(advert)));
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
        .then(res => res.data.Items.map(advert => new Advert(advert)));
    },

    /**
    * Llama a la API para crear un nuevo anuncio
    * @param {Advert} advert 
    */
    postAdvert: (advert, jwt) => {
        // Form Data
        const formData = new FormData();
        formData.append('name', advert.name);
        formData.append('description', advert.description);
        formData.append('price', advert.price);
        formData.append('type', advert.type);
        formData.append('photoFile', advert.file);
        // Headers for authenticated endpoint
        const config  = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        }
        // Call endpoint and return
        return Axios.post(`${API_URL}`, formData, config)
        .then(res => new Advert(res.data.Item));
    },
    
    /**
    * Llama a la API para editar un anuncio
    * @param {Advert} advert 
    */
    editAdvert: (advert, jwt) => {
        // Form Data
        const formData = new FormData();
        formData.append('name', advert.name);
        formData.append('description', advert.description);
        formData.append('price', advert.price);
        formData.append('type', advert.type);
        formData.append('booked', advert.booked);
        formData.append('sold', advert.sold);
        formData.append('photoFile', advert.file);
        // Headers for authenticated endpoint
        const config  = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        }
        // Call endpoint and return
        return Axios.put(`${API_URL}/${advert.productId}`, formData, config)
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
        return Axios.put(`${API_URL}/${productId}/book`, config)
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
        return Axios.put(`${API_URL}/${productId}/sell`, config)
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
        .then(res => res.data.Item);
    }
}