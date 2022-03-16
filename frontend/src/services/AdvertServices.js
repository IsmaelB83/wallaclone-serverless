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
        // Endpoint
        let baseURL = `${API_URL}`;
        // Call endpoint and return
        return Axios.get(baseURL)
        .then(res => {
            return {
                end: res.data.end,
                start: res.data.start,
                totalCount: res.data.totalCount,
                adverts:  res.data.results.map(advert => new Advert(advert))
            }
        });
    },
    
    /**
    * Obtener un anuncio por su slug
    */
    getAdvert: (slug) => {
        // Endpoint
        let baseURL = `${API_URL}/${slug}`;
        // Call endpoint and return
        return Axios.get(baseURL)
        .then(res => new Advert(res.data.result));
    },
    
    /**
    * Returns all sales adverts for a specific user
    */
    soldHistory: (jwt) => {
        // Endpoint
        let baseURL = `${API_URL}/sold`;
        // Call endpoint and return
        return Axios.get(baseURL, { headers: { 'Authorization': `Bearer ${jwt}`}})
        .then(res => {
            return {
                end: res.data.end,
                start: res.data.start,
                totalCount: res.data.totalCount,
                adverts: res.data.results.map(advert => new Advert(advert))
            }
        });
    },

    /**
    * Llama a la API para crear un nuevo anuncio
    * @param {Advert} advert 
    */
    postAdvert: (advert, jwt) => {
        // Endpoint
        const baseURL = `${API_URL}`;
        // Form Data
        const formData = new FormData();
        formData.append('name', advert.name);
        formData.append('description', advert.description);
        formData.append('price', advert.price);
        formData.append('type', advert.type);
        formData.append('photoFile', advert.file);
        // Config 
        const config = {
            headers: { 
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'multipart/form-data'
            }
        }
        // Call endpoint and return
        return Axios.post(baseURL, formData, config)
        .then(res => new Advert(res.data.result));
    },
    
    /**
    * Llama a la API para editar un anuncio
    * @param {Advert} advert 
    */
    editAdvert: (advert, jwt) => {
        // Endpoint
        const baseURL = `${API_URL}/${advert.slug}`;
        // Form Data
        const formData = new FormData();
        formData.append('name', advert.name);
        formData.append('description', advert.description);
        formData.append('price', advert.price);
        formData.append('type', advert.type);
        formData.append('booked', advert.booked);
        formData.append('sold', advert.sold);
        formData.append('photoFile', advert.file);
        // Config 
        const config = {
            headers: { 
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'multipart/form-data'
            }
        }
        // Call endpoint and return
        return Axios.put(baseURL, formData, config)
        .then(res => new Advert(res.data.result));
    },
    
    /**
    * Llama a la API para marcar un anuncio como reservado
    * @param {Advert} advert 
    */
    bookAdvert: (slug, jwt) => {
        // Endpoint
        const baseURL = `${API_URL}/book/${slug}`;
        // Config 
        const config = {
            headers: { 
                'Authorization': `Bearer ${jwt}`,
            }
        }
        // Call endpoint and return
        return Axios.put( baseURL, config )
        .then(res => new Advert(res.data.result));
    },
    
    /**
    * Llama a la API para marcar un anuncio como reservado
    * @param {Advert} advert 
    */
    sellAdvert: (slug, jwt) => {
        // Endpoint
        const baseURL = `${API_URL}/sell/${slug}`;
        // Config 
        const config = {
            headers: { 
                'Authorization': `Bearer ${jwt}`,
            }
        }
        // Call endpoint and return
        return Axios.put( baseURL, config )
        .then(res => new Advert(res.data.result));
    },
    
    /**
    * Llama a la API para editar un anuncio
    * @param {Advert} advert 
    */
    deleteAdvert: (slug, jwt) => {
        // Endpoint
        const baseURL = `${API_URL}/${slug}`;
        // Call endpoint and return
        return Axios.delete(
            baseURL, 
            { headers: { 'Authorization': `Bearer ${jwt}`} }
            )
            .then(res => res.data.result);
        }
    }