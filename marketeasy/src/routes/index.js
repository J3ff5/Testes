import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from '../pages/Login';
import Products from '../pages/Products';

const Stack = createNativeStackNavigator();

export default function Routes() {
  
  const [isAuth, setIsAuth] = useState(logout)

  const logout = useSelector(state => state.token)

  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem('@app_token');
      if (token) {
        let tokenExpiration = await AsyncStorage.getItem(
          '@app_token_expiration',
        );
        tokenExpiration = tokenExpiration.split(/\D/);
        tokenExpiration = new Date(
          tokenExpiration[2],
          tokenExpiration[1],
          tokenExpiration[0],
          tokenExpiration[3],
          tokenExpiration[4],
          tokenExpiration[5],
        );

        if (tokenExpiration > Date.now()) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } else {
        setIsAuth(false);
      }
    }
    getToken();
  }, [logout]);


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{headerShown: false}}>
        {isAuth ? (
          <Stack.Screen name="Products" component={Products} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
