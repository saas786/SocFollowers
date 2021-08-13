<template>
	<ion-page>
		<Header is-custom-back is-settings :title="$t('message.settings')" />
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">{{ $t('message.settings') }}</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-list>
				<ion-card>
					<ion-item lines="none">
						<ion-icon slot="start" :icon="personOutline"></ion-icon>
						<ion-label>{{ user.id }}</ion-label>
						
					</ion-item>
					<ion-item lines="none">
						<ion-icon slot="start" :icon="cashOutline"></ion-icon>
						<ion-label>{{ coins + ' ' + $t('message.coin', coins) }}</ion-label>
						<ion-button @click="isOpenPayRef = !isOpenPayRef" :disabled="processSheet !== 'willReady'">{{ $t('message.buy_coins') }}</ion-button>
					</ion-item>
				</ion-card>
				<ion-card v-if="isOpenPayRef">
					<ion-item lines="full">
						<ion-icon slot="start" src="/assets/dollar.svg" class="icon-25"></ion-icon>
						<ion-input v-model="customCoins" :placeholder="$t('message.your_quantity')" type="number"></ion-input>
						<ion-icon slot="end" @click="buyCoins" :icon="isPressedBuy ? checkmarkOutline : chevronForwardOutline" class="icon-25"></ion-icon>
						<small>650 {{ $t('message.min') }}</small>
					</ion-item>
					<ion-item lines="full" @click="createPaymentSheet(1000)">
						<ion-icon slot="start" src="/assets/dollar.svg" class="icon-25"></ion-icon>
						{{ 1000 + ' ' + $t('message.coin', 1000) }}
					</ion-item>
					<ion-item lines="full" @click="createPaymentSheet(2000)">
						<ion-icon slot="start" src="/assets/dollar.svg" class="icon-25"></ion-icon>
						{{ 2000 + ' ' + $t('message.coin', 2000) }} <ion-note slot="end" color="success">+200</ion-note>
					</ion-item>
					<ion-item lines="full" @click="createPaymentSheet(5000)">
						<ion-icon slot="start" src="/assets/dollar.svg" class="icon-25"></ion-icon>
						{{ 5000 + ' ' + $t('message.coin', 5000) }} <ion-note slot="end" color="success">+500</ion-note>
					</ion-item>
					<ion-item lines="full" @click="createPaymentSheet(10000)">
						<ion-icon slot="start" src="/assets/dollar.svg" class="icon-25"></ion-icon>
						{{ 10000 + ' ' + $t('message.coin', 10000) }} <ion-note slot="end" color="success">+1000</ion-note>
					</ion-item>
					<ion-item lines="full" @click="createPaymentSheet(20000)">
						<ion-icon slot="start" src="/assets/dollar.svg" class="icon-25"></ion-icon>
						{{ 20000 + ' ' + $t('message.coin', 20000) }} <ion-note slot="end" color="success">+2000</ion-note>
					</ion-item>
					<ion-item lines="full" @click="createPaymentSheet(50000)">
						<ion-icon slot="start" src="/assets/dollar.svg" class="icon-25"></ion-icon>
						{{50000 + ' ' + $t('message.coin', 50000) }} <ion-note slot="end" color="success">+5000</ion-note>
					</ion-item>
					<ion-item lines="none" @click="createPaymentSheet(100000)">
						<ion-icon slot="start" src="/assets/dollar.svg" class="icon-25"></ion-icon>
						{{ 100000 + ' ' + $t('message.coin', 100000) }} <ion-note slot="end" color="success">+10000</ion-note>
					</ion-item>
				</ion-card>
				<ion-card>
					<ion-item lines="none">
						<ion-icon slot="start" :icon="moon"></ion-icon>
						<ion-label>{{ $t('message.dark_theme') }}</ion-label>
						<ion-toggle v-model="isDarkRef" color="light" id="themeToggle" @ionChange="onChangeTheme" slot="end"></ion-toggle>
					</ion-item>
				</ion-card>
			</ion-list>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import {
		IonNote,
		IonIcon,
		IonPage,
		IonList,
		IonCard,
		IonItem,
		IonLabel,
		IonInput,
		IonTitle,
		IonToggle,
		IonHeader,
		IonButton,
		IonToolbar,
		IonContent,
	} from '@ionic/vue';
	

	import {
		defineComponent, 
		ref
	} from 'vue';

	import { 
		moon, 
		cashOutline,
		personOutline, 
		checkmarkOutline,
		chevronForwardOutline
	} from 'ionicons/icons';

	import axios from 'axios';
	import store from '../store';
	import Header from '@/components/Header.vue';
	import { PaymentSheetEventsEnum, Stripe } from '@capacitor-community/stripe';

	export default defineComponent({
		name: 'Settings',
		components: {
			Header,
			IonNote,
			IonIcon,
			IonPage,
			IonList,
			IonCard,
			IonItem,
			IonLabel,
			IonInput,
			IonTitle,
			IonToggle,
			IonHeader,
			IonToolbar,
			IonContent,
			IonButton,

		},
		setup() {
			const user = ref(store.getters.getUserData);

			const coins = ref(user.value.coins);
			const loading = ref(false);
			const customCoins = ref<any>(null);

			const isDarkRef = ref(false);
			const checkoutRef = ref(null);
			const isOpenPayRef = ref(false);
			const isPressedBuy = ref(false);
			const processSheet = ref('willReady');

			const arrProducts = ref([
				{
					price: 'prod_Jz3ZPfi34hOMBD',
					quantity: 1
				}
			]);

			const theme = localStorage.getItem('theme') ?? 'light';

			isDarkRef.value = theme == 'dark';

			const onChangeTheme = (event: any) => {
				isDarkRef.value = event.detail.checked;
				localStorage.setItem('theme', isDarkRef.value ? 'dark' : 'light');
				document.body.classList.toggle('dark', isDarkRef.value);
			};

			Stripe.addListener(PaymentSheetEventsEnum.Loaded, () => {
				processSheet.value = 'Ready';

				console.log('PaymentSheetEventsEnum.Loaded');
			});

			Stripe.addListener(PaymentSheetEventsEnum.FailedToLoad, () => {
				console.log('PaymentSheetEventsEnum.FailedToLoad');
			});

			Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
				processSheet.value = 'willReady';

				console.log('PaymentSheetEventsEnum.Completed');

				store.dispatch('getUser');
				store.dispatch('updateUser');

				setTimeout(() => {
					const json = localStorage.getItem('user');

					if (json) {
						user.value = JSON.parse(json);
						coins.value = user.value.coins;

						console.log(user.value, coins.value);
					}
				}, 1200);
			});

			Stripe.addListener(PaymentSheetEventsEnum.Canceled, () => {
				processSheet.value = 'willReady';

				console.log('PaymentSheetEventsEnum.Canceled');
			});

			Stripe.addListener(PaymentSheetEventsEnum.Failed, () => {
				processSheet.value = 'willReady';

				console.log('PaymentSheetEventsEnum.Failed');
			});

			async function createPaymentSheet(coins = 1000) {
				setTimeout(() => {
					processSheet.value = 'willReady';
				}, 4200);

				axios.post('/stripe/paymentSheet', {coins: coins}).then(async(response: any) => {
					const { paymentIntent, ephemeralKey, customer } = response.data;

					await Stripe.createPaymentSheet({
						paymentIntentClientSecret: paymentIntent,
						customerEphemeralKeySecret: ephemeralKey,
						customerId: customer,
						merchantDisplayName: 'SocFollowers',
						style: 'alwaysDark'
					}).then(async(result: any) => {
						console.log(result);
						
						setTimeout(() => {
							if (processSheet.value === 'Ready') {
								Stripe.presentPaymentSheet();
							}
							isPressedBuy.value = !isPressedBuy.value;
						}, 500);
					}).catch((error: any) => {
						console.error('ErrorPay:', error);

						isPressedBuy.value = !isPressedBuy.value;
					});
				}).catch((error: any): void => {
					const { response } = error;
					
					isPressedBuy.value = !isPressedBuy.value;

					console.error('Error:', response);
				});
			}

			async function presentPaymentSheet() {
				Stripe.presentPaymentSheet();
			}

			const buyCoins = () => {
				isPressedBuy.value = !isPressedBuy.value;

				createPaymentSheet(customCoins.value);
			}

			return {
				moon,
				user,
				coins,
				loading,
				buyCoins,
				isDarkRef,
				customCoins,
				cancelPage: 'https://socfollwers.fun/stripe/cancel',
				successPage: 'https://socfollwers.fun/stripe/successful',
				checkoutRef,
				cashOutline,
				arrProducts,
				isPressedBuy,
				isOpenPayRef,
				processSheet,
				onChangeTheme,
				personOutline,
				publishableKey: 'pk_test_51IU9pVECieeLlFGwYhtzGTIJA4qsaT3NAOjIOcQGYT9rJ2oFQXryhu4SNHgUQV1tg6aW2gli1XPjakiIyZQcstyI000hN7etHj',
				checkmarkOutline,
				createPaymentSheet,
				presentPaymentSheet,
				chevronForwardOutline,

			};
		}
	});
</script>
