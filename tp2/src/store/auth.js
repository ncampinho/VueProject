import axios from 'axios'

export default {
    namespaced: true,
    state: {
        user: null,
        error: null,
    },
    getters: {
        isAuthenticated (state){
            return state.user ? true : false
        },
        
        userData (state){
            return state.user
        },

        hasError (state){
            return state.error
        }
        
    },
    mutations: {
        'SET_USER'(state, user){
            state.user = user
        },

        'SET_ERROR'(state, error){
            state.error = error
        }
    },
    actions: {
        login({ dispatch }, credentials) {
            axios
                .get(`http://localhost:3000/api/tp2/user/login/${credentials.username},${credentials.password}`)
                .then(response => response)
                .then(data => {
                    if(typeof (data.data) === 'string'){
                        dispatch('authenticationError', data.data)
                    }else{
                        dispatch('authenticate', data.data) 
                    }     
                })
                .catch(error => console.log(error))
        },

        logout({ dispatch }){
            dispatch('authenticate', null)
        },

        authenticate({ commit }, user){
            commit('SET_USER', user)
            commit('SET_ERROR', null)
        },

        authenticationError({ commit }, error){
            commit('SET_ERROR', error)
        }

    },
}
