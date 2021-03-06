import axios from 'axios';
import { createStore } from 'vuex';
// import User from '@/store/models/UserModel';

export default createStore({
    state: {
        user: {},
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        }
    },
    actions: {
		async updateUser({ commit }) {
			axios.get('/user').then((response: any) => {
				const { data } = response;

				localStorage.setItem('user', JSON.stringify(data));

				commit('setUser', data);
			});
		},
		getUser({ commit }) {
			const json = localStorage.getItem('user');
			const user = json ? JSON.parse(json) : false;
		
			commit('setUser', user);
		}
    },
    getters: {
        getUserData(state): any {
            return state.user;
        }
    },
    strict: true
});