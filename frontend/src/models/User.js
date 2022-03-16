// Assets
// CSS

// Empty user
export const EMPTY_USER = {
  name: '',
  login: '',
  online: false
}

// Modelo sesión de session
export default class User {
  
  /** Constructor
  * @param {Object} User 
  */    
  constructor(user) {
    this._id = user._id;
    this.login = user.login;
    this.name = user.name;
    this.email = user.email
  }
}