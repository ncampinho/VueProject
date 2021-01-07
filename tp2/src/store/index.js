//Vue vuex store
import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import cart from './shoppingCart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  //Modules -> all logic to perform actions on states
  modules: {
    auth,
    cart
  }
})
