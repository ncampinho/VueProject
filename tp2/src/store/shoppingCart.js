import axios from 'axios'

export default {
    namespaced: true,
    state: {
        productLine: null,
    },
    getters: {
        getPurchaseLine (state){
            return state.productLine
        },
    },
    mutations: {
        'SET_CART'(state, cartInfo){
            state.productLine = cartInfo
        }
    },
    actions:{
        fetchProducts({ dispatch }, idUser){
            axios
                .get(`http://localhost:3000/api/tp2/user/purchase/getTempLine/${idUser}`)
                .then(response => response)
                .then(data => {
                    console.log(data)
                    dispatch('insertCart', data.data); 
                })
                .catch(error => console.log(error))
        },

        insertCart( { commit }, cartInfo ){
            commit('SET_CART', cartInfo)
        }
    },
}