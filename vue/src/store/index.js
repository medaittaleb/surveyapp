import {createStore} from 'vuex';
import axiosClient from '../axios';



const store = createStore({
    state: {
        user:{
            data:{},
            token: sessionStorage.getItem('TOKEN'),
        }
    },
    getters: {},
    actions: {
        register({ commit }, user){
            return axiosClient.post('/register', user)
                .then(({data}) => {
                    commit('setUser', data);
                    return data;
                })
        },
        login({ commit }, user){
            return axiosClient.post('/login', user)
                .then(({data}) => {
                    commit('setUser', data);
                    return data;
                })
        },
        logout({ commit }){
            return axiosClient.post('/logout')
                .then( res  => {
                    commit('uLogout');
                    return res;
                })
        }
    },
    mutations: {
        uLogout: (state) => {
            state.user.data = {};
            state.user.token = null
        },
        setUser: (state,userData) => {
            state.user.data = userData.user;
            state.user.token = userData.token;
            sessionStorage.setItem('TOKEN', userData.token);
        }
    },
    modules: {}    
})


export default store;