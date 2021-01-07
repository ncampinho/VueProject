/**ShoppingCart is responsible to hold the logic behind keeping data about 
 * the logged in user items that were previously incorporated on the shopping cart
 */
import axios from 'axios'

export default {
    namespaced: true,
    //Variables to keep data persisting while changes pages
    state: {
        productLine: null,
    },
    //Return state variables data
    getters: {
        //Returns all data on the user's shopping cart
        getPurchaseLine (state){
            return state.productLine
        },
    },
    //Perform changes on state variable data
    mutations: {
        //Mutation to change shopping cart value
        'SET_CART'(state, cartInfo){
            state.productLine = cartInfo
        }
    },
    //Coordinates dispatch and commits actions in order to perform mutation
    actions:{
        //Dispatch action -> sends api returned response (shopping cart data) to commit action
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

        //Commit action -> commits shopping cart data
        insertCart( { commit }, cartInfo ){
            commit('SET_CART', cartInfo)
        }
    },
}