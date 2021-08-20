import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import { AuthService } from '../../services/authService';
import Toast from 'react-native-simple-toast';
import { useDispatch } from 'react-redux';


export default function Login({navigation}) {

    const dispatch = useDispatch();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const authController = new AuthService();

    async function login(){
        Keyboard.dismiss();
        const result = await authController.login(user, password);
        
        if(result.status !== 'ok'){
            Toast.show(result.messages[0].message, Toast.LONG);
        } else {
            hasToken(result.token, result.tokenExpiration);
        }
    }

    function hasToken(token, tokenExpiration){
        dispatch({
            type: 'SET_TOKEN',
            token,
            tokenExpiration
        })
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
            <View style={styles.container} >

                <View style={styles.containerTitle} >
                    <Image style={styles.image} source={require('../../assets/logo.jpg')} style={styles.logo} />
                </View>

                <View style={styles.containerInputs} >

                    <View style={styles.inputs} >
                        <TextInput placeholder='usuário' keyboardType='numeric' placeholderTextColor='#a1a1a1' maxLength={6} style={styles.inputText} value={user} onChange={e => setUser(e.nativeEvent.text)} />
                    </View>

                    <View style={styles.inputs} >
                        <TextInput placeholder='senha' keyboardType='numeric' placeholderTextColor='#a1a1a1' style={styles.inputText} maxLength={6} value={password} onChange={e => setPassword(e.nativeEvent.text)} />
                    </View>

                    <TouchableOpacity onPress={() => login()} activeOpacity={0.8} style={styles.button} >
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#39009C',
    },

    containerTitle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#39009C',
        width: '100%',
    },

    containerInputs: {
        flex: 3,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderTopLeftRadius: 100,
        alignItems: 'center',
    },

    inputs: {
        backgroundColor: '#c3c3c3',
        borderRadius: 20,
        padding: 10,
        margin: 10,
        width: '90%',
    },

    inputText: {
        fontSize: 20,
        color: '#FFF',
        fontFamily: 'Avenir',
        fontWeight: 'bold',
    },

    button: {
        backgroundColor: '#39009C',
        borderRadius: 20,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        width: '60%',
        height: 100,
    },

    buttonText: {
        color: '#FFF',
        fontSize: 20,
        fontFamily: 'Avenir',
        fontWeight: 'bold',
    },
});