import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { ProductsService } from '../../services/productsService';

export default function Products({navigation}) {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const productsController = new ProductsService();

    useEffect(() => {
        setIsLoading(true);
        loadProducts();
    }, []);

    async function loadProducts(){
        const result = await productsController.getProducts();
        setProducts(result);
        setIsLoading(false);
    }

    return (
        <View style={styles.container} >
            
            <View style={styles.title}>
                <Text style={styles.titleText}>Produtos</Text>
            </View>

            {
                isLoading ?
                    <View style={styles.loadingView} >
                        <ActivityIndicator animating={isLoading} size="large" color="#39009C" />
                    </View>
                    :
                    <View style={styles.products}>
                        <ScrollView>
                        {
                            Array.isArray(products) && products?.map((product, index) => {
                                return (
                                    <View style={styles.product} key={index} >
                                        <Text style={styles.productText}>{product.descricao}</Text>
                                        <Text style={styles.productText}>R$ {product.valorUnitario}</Text>
                                    </View>
                                )
                            })
                        }
                        </ScrollView>
                    </View>
            }

            <View style={styles.containerButton} >
                <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => {navigation.navigate('Login')}} >
                    <Text style={styles.buttonText} >Sair</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#39009C',
        alignItems: 'center',
    },

    title: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#39009C',
        padding: 10,
        marginTop: 20,
    },
    
    titleText: {
        color: '#FFF',
        fontSize: 30,
        fontFamily: 'Avenir',
        fontWeight: 'bold',
    },

    products: {
        flex: 1,
        backgroundColor: '#c3c3c3',
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
        width: '90%',
        borderRadius: 20,
    },

    product: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#39009C',
        justifyContent: 'space-between',
        padding: 10,
        paddingHorizontal: 30,
        marginTop: 20,
        borderRadius: 20,
    },

    productText: {
        color: '#FFF',
        fontSize: 14,
        fontFamily: 'Avenir',
        fontWeight: 'bold',
    },

    containerButton: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        backgroundColor: '#39009C',
        borderRadius: 20,
        borderColor: '#fff',
        borderWidth: 2,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: '40%',
        height: 50,
        bottom: 20,
    },

    buttonText: {
        color: '#FFF',
        fontSize: 20,
        fontFamily: 'Avenir',
        fontWeight: 'bold',
    },

    loadingView: {
        flex: 1,
        backgroundColor: '#c3c3c3',
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
        width: '90%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
})