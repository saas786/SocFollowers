import axios from 'axios';
import { createStore } from 'vuex';
import User from '@/store/models/UserModel';

interface State {
    user: User|any;
}

export default createStore<State>({
    state: {
        user: {},
    },
    mutations: {
        setUser(state, payload: User) {
            state.user = payload;
        }
    },
    actions: {
		async updateUser({ commit }): Promise<void> {
			axios.get('/user').then((response: any) => {
				const { data } = response;

				localStorage.setItem('user', JSON.stringify(data));

				commit('setUser', data);
			});
		},
		getUser({ commit }): void {
			const json = localStorage.getItem('user');
			const user = json ? JSON.parse(json) : false;
		
			commit('setUser', user);
		}
    },
    getters: {
        getUserData(state): User {
            return state.user;
        }
    },
    strict: true
});