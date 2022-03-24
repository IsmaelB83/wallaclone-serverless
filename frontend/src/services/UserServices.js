// NPM Modules
import Axios from 'axios';
// Material UI
// Own modules
// Models
// Assets
// CSS

// Endpoint
const API_URL = `${process.env.REACT_APP_API_URL}/users`;


/**
* Objeto API
*/
export default {
    
    // Get user profile attached to an auth0 identity
    get: async jwt => {
        // Config 
        const config = {
            headers: { 
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'multipart/form-data'
            }
        }
        // Call endpoint and return
        return Axios.get(API_URL, config)
        .then(res => res.data.Item)
    },
    
    // Edit user profile attached to auth0 identity
    edit: async (user, jwt) => {
        // Advert data
        const data = {
            login: user.login,
            name: user.name,
            email: user.email,
        }
        // Config 
        const config = {
            headers: { 
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'multipart/form-data'
            }
        }
        // Call endpoint and return
        return Axios.patch(API_URL, data, config)
        .then(res => res.data.Item)
    },

    // Obtener presigned url para subir el avatar al bucket
    getPresignedUrl: jwt => {
        // Headers for authenticated endpoint
        const config  = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        }
        // Call endpoint and return
        return Axios.post(`${API_URL}/avatar`, {}, config)
        .then(res => res.data.response);
    },
}