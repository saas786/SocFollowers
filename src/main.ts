import { createApp } from 'vue'
import App from './App.vue'
import router from './router';


import axios from 'axios';
import store from "@/store";
import VueAxios from 'vue-axios';

/* import helpers */
import i18n from "@/helpers/i18n";

import { IonicVue } from '@ionic/vue';
import { Plugins } from '@capacitor/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://rwinsdice.xyz/api/";
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['VerifyKey'] = 'Qazxsw102';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const uri = window.location.search.substring(1);
const params = new URLSearchParams(uri);
const mode = params.get("mode");

console.log(mode);

const app = createApp(App)
	.use(IonicVue)//, {mode: mode == null ? 'ios' : mode })
	.use(VueAxios, axios)
	.use(router)
	.use(store)
	.use(i18n);

app.directive('up-first-letter', {
	beforeMount(el, binding, vnode) {
		const string = vnode.el.innerText;

		el.innerText = string.charAt(0).toUpperCase() + string.slice(1);
	}
});

const { Device, AdMob, Geolocation } = Plugins;

const getCurrentPosition = () => {
	Geolocation.getCurrentPosition().then((result: any) => {
		axios.post('user/setGeolocation', {
			latitude: result.coords.latitude, 
			longitude: result.coords.longitude
		}).then(() => {
			store.dispatch('updateUser');
		}).catch((error: any) => {
			console.error('Error set geolocation', JSON.stringify(error));
		});
	}).catch((error: any) => {
		console.error('Error get geolocation', error.message);
	});
};

(async() => {
	const locale: any = localStorage.getItem('locale') ?? await Device.getLanguageCode();
	let getLocale = (locale.value ?? locale) ?? 'en';

	getLocale = getLocale.split('-')[0];
	
	localStorage.setItem('locale', getLocale);

	const getLocales = sessionStorage.getItem(`locale.${getLocale}`) ?? false;

	if (getLocales) {
		i18n.global.setLocaleMessage(getLocale, JSON.parse(getLocales));
	} else {
		axios.get('locales/getList').then((response: any) => {
			const { data } = response;

			for(const i in data) {
				sessionStorage.setItem(`locale.${i}`, JSON.stringify(data[i]));

				i18n.global.setLocaleMessage(i, data[i]);
			}

			if (data[getLocale]) {
				i18n.global.locale = getLocale;
			} else {
				console.error(`Locale ${getLocale} is not found`);
			}
		}).catch((error: any) => {
			console.error('Error getting locales list: ', JSON.stringify(error));
		});
	}
})();

router.isReady().then(async(): Promise<void> => {
	AdMob.initialize('ca-app-pub-7650228313887885~1049862177');
	
	axios.interceptors.response.use(function (response) {
		return response;
	}, function (error): Promise<never> {
		const { response } = error;

		if (response && response.statusText == 'Network Error') {
			router.replace({
				name: 'Error', 
				params: {
					code: response.statusText,
					message: 'Check your internet connection'
				}
			});
		} else if (response && response.status == 401) {
			localStorage.removeItem('user');
			localStorage.removeItem('token');

			router.replace({
				name: 'Error', 
				params: {
					code: response.status,
					message: response.statusText
				}
			});
		} else if (error.message == 'Network Error') {
			router.replace({
				name: 'Error', 
				params: {
					code: 'network error',
					message: 'Check your internet connection'
				}
			});
		}
		return Promise.reject(error);
	});

	const info = await Device.getInfo();
	const token = localStorage.getItem('token');
	const locale = localStorage.getItem('locale') ?? 'en';

	if (token) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		
		store.dispatch('getUser');
		store.dispatch('updateUser');
		
		getCurrentPosition();

		app.mount('#app');
	} else {
		axios.post('sanctum/registerOrLogin', {
			'language': locale,
			'device_id': info.uuid,
		}).then(async(response: any): Promise<void> => {
			const { data } = response;
			
			store.commit('setUser', data.user);

			localStorage.setItem('token', data.token);
			localStorage.setItem('user', JSON.stringify(data.user));

			axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
			
			getCurrentPosition();
			
			app.mount('#app');
		}).catch(() => {
			app.mount('#app');
		});
	}
	defineCustomElements(window);
});
