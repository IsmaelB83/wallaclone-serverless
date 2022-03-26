// Node modules
import auth0 from 'auth0-js';

// Class to ineract with Auth0 services
export default class AuthServices {
    
    // Integratino with auth0
    auth0 = new auth0.WebAuth({
        domain: 'dev-wbbbogs3.us.auth0.com',              // Auth0 domain
        clientID: 'yIKjkEIUrCZ70Pw0zYXl3QkHTdMyLHmA',     // Auth0 client id
        redirectUri: process.env.REACT_APP_AUTH0_REDIRECT,   // Callback url in frontend
        responseType: 'token id_token',
        scope: 'openid'
    });
    
    // Constructor
    constructor() {       
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        console.log(this.auth0)
    }
    
    // Request login to auth0
    login() {
        this.auth0.authorize();
    }
    
    // Logout from auth0
    logout() {
        this.auth0.logout({ return_to: window.location.origin });
    }
    
    // Handle authentication and callback with results
    handleAuthentication(callback) {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                callback(null, authResult);
            } else if (err) {
                callback(err, null);
            }
        });
    }
}