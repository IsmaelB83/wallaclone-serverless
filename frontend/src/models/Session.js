// NPM Modules
// Material UI
// Own modules
// Assets
// CSS

// Modelo sesión de usuario
export default class Session {
    
    /**
     * Constructor of a session object
     * @param {String} token JWT of current session
     */
    constructor(expiresIn, jwt, id) {
        this.expiresAt = (expiresIn * 1000) + new Date().getTime();;
        this.jwt = jwt;
        this.userId = id;
    }

    isAuthenticated() {
        return new Date().getTime() < this.expiresAt;
    }
}