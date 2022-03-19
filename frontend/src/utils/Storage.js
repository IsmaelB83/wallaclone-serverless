// NPM Modules
// Material UI
// Own modules
// Assets
// CSS

/**
 * Objeto para trabajar con local storage
 */
const LocalStorage = {

    /**
     * Salvar sesión en local storage
     */
    saveLocalStorage: (session) => {
        if (session.userId) {
            localStorage.setItem('wallaclone-serverless', JSON.stringify(session));
        }
    },

    /**
     * Recuperar sesión del local storage
     */
    readLocalStorage: () => {
        try {
            const session = localStorage.getItem('wallaclone-serverless');
            return JSON.parse(session)               
        } catch (error) {
            localStorage.clear();
            return undefined;
        }
    },
    
    /**
     * Clean local storage
     */
    cleanLocalStorage: () => {
        localStorage.clear();
    }
}

/**
 * Retorno el objeto
 */
export default LocalStorage;