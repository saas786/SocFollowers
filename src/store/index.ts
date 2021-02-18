import { createStore } from 'vuex';
import User from '@/store/models/UserModel';

export default createStore({
    state: {
        user: {} as User,
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        }
    },
    actions: {
        saveUser({ commit }) {
            commit('setUser');
        }
    },
    getters: {
        getUser(state): any {
            return state.user;
        }
    },
    strict: true
});