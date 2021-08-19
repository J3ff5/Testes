import api from './api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-simple-toast';

export class ProductsService {

    constructor() {
        this.products = []
    }


    /**
     * Tries to load the products from the api.
     *  
     * ```js
     * const productsController = new ProductsService()
     * 
     * const result = await productsController.loadProducts()
     * if(result){
     *    //
     * }
     * ```	
     * 
     * @returns {Promise<object>} if the products are successfully loaded, it returns a promise with the products.
     * @returns {Promise<null>} if the products are not successfully loaded, it returns null. 
    */
    async getProducts() {
        const token = await AsyncStorage.getItem('@app_token')
        if(token){
            const response = await api.get('/v2.0/produtounidade/listaprodutos/0/unidade/83402711000110', {
                headers: {token: token},
            })
            const allProducts = response.data.response.produtos

            if(response.status === 200){
                allProducts.map(product => {
                    let productBody = {
                        codigoInterno: product.Codigo,
                        descricao: product.Descricao,
                        valorUnitario: product.Preco,
                        codigoBarras: product.CodigoBarras
                    }
                    
                    this.products.push(productBody)
                })

                return this.products
            } else {
                Toast.show('Erro ao buscar produtos', LONG)
                return null
            }
        }
    }
}