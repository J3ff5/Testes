import api from './api'

export class AuthService {
    constructor() {
    
    }


    /**
     * Tries to login with the given credentials
     * 
     * ```js
     * const authController = new AuthController();
     * const body = { ... };
     * 
     * const result = await authController.login(body);
     * if(result){
     *      // 
     * }
     * ```
     * 
     * @param {string} user username input on login screen
     * @param {string} password password input on login screen
     * 
     * @returns {Promise<object>} 
    */
    async login(user, password){

        const body = {
            usuario: user,
            senha: password,
        }

        const response = await api.post('v1.1/auth', body)
        return response.data.response
    }


    /**
     * Tries to logout the current user
     * 
     * 
    */
    async logout(){

    }
}