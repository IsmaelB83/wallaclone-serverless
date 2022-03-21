// NPM Modules
import Axios from 'axios';
// Material UI
// Own modules
// Assets
// CSS

/**
* Objeto API
*/
export default {
    
    /**
    * Llama a la API para crear un nuevo anuncio
    * @param {Advert} advert 
    */
    uploadFile: (url, file) => {
        // Call endpoint and return
        return Axios.put(url, file, { headers: { 'Content-Type': file.type } })
        .then(res => res.data);
    }
}