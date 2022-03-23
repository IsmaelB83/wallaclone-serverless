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
    constructor(expiresIn, jwt, id, user) {
        this.userId = id
        this.expiresAt = (expiresIn * 1000) + new Date().getTime();;
        this.jwt = jwt;
        this.login = true;
        this.user = user;
        this.name = '';
        this.email = '';
        this.avatar = ''
        this.completeProfile = true
    }

    /**
     * Set user information from user profile in database
     * @param {*} user User information to personalize auth0 profile in wallaclone
     */
    setUserInformation(user) {
        this.completeProfile = false
        this.name = user.name
        this.email = user.email
        this.avatar =  user.avatar
    }

    isAuthenticated() {
        return new Date().getTime() < this.expiresAt;
    }
}