import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import axios from 'axios';
import store from "@/store";
import VueAxios from 'vue-axios';

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

// const authToken = '1|XPlfL3tPLLsBKPD8uM4q2joG8cxqsQnEyI336rtj';

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
	.use(IonicVue)// , {mode: mode == null ? 'ios' : mode })
	.use(router)
	.use(store)
	.use(VueAxios, axios);

app.directive('up-first-letter', {
	beforeMount(el, binding, vnode) {
		const string = vnode.el.innerText;

		el.innerText = string.charAt(0).toUpperCase() + string.slice(1);
	}
});

const { Device, AdMob, Geolocation } = Plugins;

router.isReady().then(async() => {
	AdMob.initialize('ca-app-pub-7650228313887885~1049862177');// 'ca-app-pub-7650228313887885/4950127471');
	
	const coordinates = await Geolocation.getCurrentPosition();

	console.log('Coordinates:', JSON.stringify(coordinates));

	const info = await Device.getInfo();
	const lang = await Device.getLanguageCode();

	axios.post('sanctum/registerOrLogin', {
		'device_id': info.uuid,
	}).then(response => {
		const { data } = response;
		
		data.user.lang = lang.value;

		localStorage.setItem('user', JSON.stringify(data.user));

		axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
		
		axios.post('user/setGeolocation', coordinates).then(response => {
			const { data } = response;

			console.log('Success setAddress:', JSON.stringify(data));
		}).catch((error: any) => {
			console.error('Error setAddress:', JSON.stringify(error));
		});
		app.mount('#app');
	}).catch(() => {
		app.mount('#app');
	});

	axios.interceptors.response.use(function (response) {
		return response;
	}, function (error) {
		const { response } = error;
		
		console.log(response.statusText);

		if (response.statusText == 'Network error') {
			router.replace({name: 'Error', params: {
				code: response.statusText,
				message: 'Check your internet connection'
			}});
		}
		return Promise.reject(error);
	});
	defineCustomElements(window);
});
