import AsyncStorage from "@react-native-async-storage/async-storage"


export default function token(state = false, action){
    switch(action.type){

        /**
         * Will set the token in the AsyncStorage
         * 
         * @param {string} token
         * @returns {Promise<boolean>} will return true if the token was set and will login the user
        */
        case 'SET_TOKEN':
            AsyncStorage.setItem('@app_token', action.token);
            AsyncStorage.setItem('@app_token_expiration', action.tokenExpiration);
            return true;

        /**
         * Will remove the token from the AsyncStorage
         * 
         * @returns {Promise<boolean>} will return false if the token was 
         * removed and logout the user
         */
        case 'REMOVE_TOKEN':
            AsyncStorage.clear();
            return false;

        default:
          return state
    }
}