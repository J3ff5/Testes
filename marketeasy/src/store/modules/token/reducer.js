import AsyncStorage from "@react-native-async-storage/async-storage"

export default function token(state = false, action){
    switch(action.type){
        case 'SET_TOKEN':
            AsyncStorage.setItem('@app_token', action.token);
            AsyncStorage.setItem('@app_token_expiration', action.tokenExpiration);
            return true;

        case 'REMOVE_TOKEN':
            AsyncStorage.clear();
            return false;

        default:
          return state
    }
}