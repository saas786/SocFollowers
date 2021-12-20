import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

// import LogRocket from 'logrocket';
// LogRocket.init('z68ai9/socfollowers');

/* eslint-disable */
import axios from 'axios';
import store from "@/store";
import VueAxios from 'vue-axios';

import i18n from "@/helpers/i18n";
import { IonicVue } from '@ionic/vue';
import { Geolocation } from '@capacitor/geolocation';
import { Device } from '@capacitor/device';
import { AdMob } from '@capacitor-community/admob';
// import { LocalNotification } from '@capacitor/local-notifications';

import { Stripe } from '@capacitor-community/stripe';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { defineCustomElements as defineStripeElements } from '@stripe-elements/stripe-elements/loader';

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
axios.defaults.baseURL = "https://socfollowers.fun/api/";
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

app.directive('up-letter', {
	beforeMount(el, binding, vnode) {
		const string = vnode.el.innerText;

		el.innerText = string.charAt(binding.value ?? 0).toUpperCase() + string.slice(binding.value > 0 ? binding.value+1 : 1);
	}
});

//import { StripeCheckout } from '@vue-stripe/vue-stripe';
//app.component('stripe-checkout', StripeCheckout);

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

Stripe.initialize({
	publishableKey: 'pk_test_51IU9pVECieeLlFGwYhtzGTIJA4qsaT3NAOjIOcQGYT9rJ2oFQXryhu4SNHgUQV1tg6aW2gli1XPjakiIyZQcstyI000hN7etHj'
});

(async() => {
	const locale: any = localStorage.getItem('locale') ?? await Device.getLanguageCode();
	let getLocale = (locale.value ?? locale) ?? 'en';

	getLocale = getLocale.split('-')[0];
	
	axios.defaults.headers.common['userLocale'] = getLocale;

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
	AdMob.initialize({
		requestTrackingAuthorization: true,
	});// 'ca-app-pub-7650228313887885~1049862177');
	
	axios.interceptors.response.use(function (response) {
		return response;
	}, function (error): Promise<never> {
		const { response } = error;

		if (response && response.statusText == 'Network Error1') {
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

	const info = await Device.getId();
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
	defineStripeElements(window);
	defineCustomElements(window);
});
