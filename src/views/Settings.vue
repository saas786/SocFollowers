<template>
	<ion-page>
		<Header is-custom-back is-settings :title="$t('message.settings')" />
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">{{ $t('message.settings') }}</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-grid>
				<ion-row class="d-flex ion-justify-content-center">
					<ion-col size-xs="12" size-sm="11" size-md="9" size-lg="7" size-xl="5">
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
								<ion-item :disabled="isActiveItem" lines="full">
									<ion-icon slot="start" src="/assets/dollar.svg" class="icon-25"></ion-icon>
									<ion-input @IonChange="onChangeInput($event, customCoins)" v-model="customCoins" :placeholder="$t('message.your_quantity')" type="number"></ion-input>
									<ion-icon slot="end" @click="buyCoins" :icon="isPressedBuy ? checkmarkOutline : chevronForwardOutline" class="icon-25"></ion-icon>
									<small v-if="customCoins !== '0' && customCoins !== '' && customCoins !== null && customCoins.length !== 0">{{ (customCoins / 1000) + '$' }}</small>
									<small v-else>{{ 650 + ' ' + $t('message.min') }}</small>
								</ion-item>
								<ion-item :disabled="isActiveItem" lines="full" @click="createPaymentSheet(1000)">
									<ion-icon slot="start" src="/assets/dollar.svg" class="icon-25"></ion-icon>
									<ion-label>{{ 1000 + ' ' + $t('message.coin', 1000) }}</ion-label>
									<ion-note slot="end" color="medium">1$</ion-note>
								</ion-item>
								<ion-item :disabled="isActiveItem" lines="full" @click="createPaymentSheet(2000)">
									<ion-icon slot="start" src="/assets/dollar.svg" class="icon-25"></ion-icon>
									{{ 2000 + ' ' + $t('message.coin', 2000) }} <ion-note slot="end" color="success">+200</ion-note>
									<ion-note slot="end" color="medium">2$</ion-note>
								</ion-item>
								<ion-item :disabled="isActiveItem" lines="full" @click="createPaymentSheet(5000)">
									<ion-icon slot="start" src="/assets/dollar.svg" class="icon-25"></ion-icon>
									{{ 5000 + ' ' + $t('message.coin', 5000) }} <ion-note slot="end" color="success">+500</ion-note>
									<ion-note slot="end" color="medium">5$</ion-note>
								</ion-item>
								<ion-item :disabled="isActiveItem" lines="full" @click="createPaymentSheet(10000)">
									<ion-icon slot="start" src="/assets/dollar.svg" class="icon-25"></ion-icon>
									{{ 10000 + ' ' + $t('message.coin', 10000) }} <ion-note slot="end" color="success">+1000</ion-note>
									<ion-note slot="end" color="medium">10$</ion-note>
								</ion-item>
								<ion-item :disabled="isActiveItem" lines="full" @click="createPaymentSheet(20000)">
									<ion-icon slot="start" src="/assets/dollar.svg" class="icon-25"></ion-icon>
									{{ 20000 + ' ' + $t('message.coin', 20000) }} <ion-note slot="end" color="success">+2000</ion-note>
									<ion-note slot="end" color="medium">20$</ion-note>
								</ion-item>
								<ion-item :disabled="isActiveItem" lines="full" @click="createPaymentSheet(50000)">
									<ion-icon slot="start" src="/assets/dollar.svg" class="icon-25"></ion-icon>
									{{ 50000 + ' ' + $t('message.coin', 50000) }} <ion-note slot="end" color="success">+5000</ion-note>
									<ion-note slot="end" color="medium">50$</ion-note>
								</ion-item>
								<ion-item :disabled="isActiveItem" lines="none" @click="createPaymentSheet(100000)">
									<ion-icon slot="start" src="/assets/dollar.svg" class="icon-25"></ion-icon>
									{{ 100000 + ' ' + $t('message.coin', 100000) }} <ion-note slot="end" color="success">+10000</ion-note>
									<ion-note slot="end" color="medium">100$</ion-note>
								</ion-item>
							</ion-card>
							<ion-card>
								<ion-item lines="none">
									<ion-icon slot="start" :icon="moon"></ion-icon>
									<ion-label>{{ $t('message.dark_theme') }}</ion-label>
									<ion-toggle v-model="isDarkRef" color="light" id="themeToggle" @ionChange="onChangeTheme" slot="end"></ion-toggle>
								</ion-item>
								<ion-item lines="none">
									<ion-icon slot="start" :icon="languageOutline"></ion-icon>
									<ion-label>{{ $t('message.lang') }}</ion-label>
									<ion-select @ionChange="onSelectLanguage" v-model="languageRef" interface="popover">
										<ion-select-option value="ru">{{ $t('message.ru') }}</ion-select-option>
										<ion-select-option value="en">{{ $t('message.en') }}</ion-select-option>
									</ion-select>
								</ion-item>
							</ion-card>
						</ion-list>
						<ion-loading
							:is-open="isOpenLoaderRef"
							:message="$t('message.please_wait')"
							@didDismiss="setOpenLoader(false)"
						>
						</ion-loading>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import {
		IonRow,
		IonCol,
		IonNote,
		IonIcon,
		IonPage,
		IonList,
		IonCard,
		IonItem,
		IonGrid,
		IonLabel,
		IonInput,
		IonTitle,
		IonToggle,
		IonHeader,
		IonSelect,
		IonButton,
		IonToolbar,
		IonContent,
		IonLoading,
		IonSelectOption,
		toastController,

	} from '@ionic/vue';
	
	import {
		defineComponent, 
		ref
	} from 'vue';

	import { 
		moon, 
		languageOutline,
		cashOutline,
		personOutline, 
		checkmarkOutline,
		chevronForwardOutline
	} from 'ionicons/icons';

	import axios from 'axios';
	import store from '../store';
	import i18n from "@/helpers/i18n";
	import { Device, DeviceInfo } from '@capacitor/device';
	import Header from '@/components/Header.vue';
	import { PaymentSheetEventsEnum, Stripe } from '@capacitor-community/stripe';

	export default defineComponent({
		name: 'Settings',
		components: {
			IonRow,
			IonCol,
			Header,
			IonNote,
			IonGrid,
			IonIcon,
			IonPage,
			IonList,
			IonCard,
			IonItem,
			IonLabel,
			IonInput,
			IonTitle,
			IonButton,
			IonToggle,
			IonHeader,
			IonSelect,
			IonToolbar,
			IonContent,
			IonLoading,
			IonSelectOption,

		},
		setup() {
			const user = ref(store.getters.getUserData);
			const locale: string = localStorage.getItem('locale') ?? 'en';

			const coins = ref(user.value.coins);
			const loading = ref(false);
			const customCoins = ref<any>(null);
			const stripeLoading = ref<boolean>(false);

			const platform = ref<any>();
			const isDarkRef = ref(false);
			const checkoutRef = ref<any>(null);
			const languageRef = ref(locale);
			const isOpenPayRef = ref(false);
			const isPressedBuy = ref(false);
			const isActiveItem = ref(false);
			const processSheet = ref('willReady');

			const isOpenLoaderRef = ref(false);
			const setOpenLoader   = (state: boolean) => isOpenLoaderRef.value = state;

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

			const onSelectLanguage = (event: any) => {
				const locale = event.detail.value;

				i18n.global.locale = locale;
				localStorage.setItem('locale', locale);
			};
			
			Device.getInfo().then((value: DeviceInfo) => {
				if (value.platform == 'web') {
					platform.value = value.platform;
				} else {
					platform.value = value.platform;
				}
			});

			Stripe.addListener(PaymentSheetEventsEnum.Loaded, async() => {
				processSheet.value = 'Ready';
				isActiveItem.value = false;
				setOpenLoader(false);
			});

			Stripe.addListener(PaymentSheetEventsEnum.FailedToLoad, async() => {
				isActiveItem.value = false;
				setOpenLoader(false);

				console.log('PaymentSheetEventsEnum.FailedToLoad');

				const toast = await toastController.create({
					color: 'danger',
					message: 'An error occurred while loading.',
					duration: 4500,
				});
				return toast.present();
			});

			Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
				processSheet.value = 'willReady';

				console.log('PaymentSheetEventsEnum.Completed');

				store.dispatch('getUser');
				store.dispatch('updateUser');

				setTimeout(async() => {
					const json = localStorage.getItem('user');

					if (json) {
						user.value = JSON.parse(json);
						coins.value = user.value.coins;

						const toast = await toastController.create({
							color: 'success',
							message: 'The balance has been successfully replenished.',
							duration: 3500,
						});
						return toast.present();
					}
				}, 1200);
			});

			Stripe.addListener(PaymentSheetEventsEnum.Canceled, () => {
				processSheet.value = 'willReady';
				isActiveItem.value = false;
				setOpenLoader(false);

				console.log('PaymentSheetEventsEnum.Canceled');
			});

			Stripe.addListener(PaymentSheetEventsEnum.Failed, async() => {
				processSheet.value = 'willReady';
				isActiveItem.value = false;
				setOpenLoader(false);

				console.log('PaymentSheetEventsEnum.Failed');

				const toast = await toastController.create({
					color: 'danger',
					message: 'An error occurred during payment.',
					duration: 4500,
				});
				return toast.present();
			});

			async function createPaymentSheet(coins = 1000) {
				isActiveItem.value = true;
				setOpenLoader(true);

				setTimeout(() => {
					isActiveItem.value = false;
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
							isActiveItem.value = false;
							isPressedBuy.value = !isPressedBuy.value;
						}, 500);
					}).catch((error: any) => {
						console.error('ErrorPay:', error);

						isActiveItem.value = false;
						isPressedBuy.value = !isPressedBuy.value;
					});
				}).catch((error: any): void => {
					const { response } = error;
					
					isActiveItem.value = false;
					isPressedBuy.value = !isPressedBuy.value;
					
					console.error('Error:', response);
				});
			}

			async function presentPaymentSheet() {
				Stripe.presentPaymentSheet();
			}

			const buyCoins = () => {
				isPressedBuy.value = !isPressedBuy.value;

				checkoutRef.value.redirectToCheckout();
				createPaymentSheet(customCoins.value);
			}

			const onChangeInput = (e: any, coins: any) => {
				console.log(customCoins, coins);
			};

			return {
				moon,
				user,
				coins,
				loading,
				buyCoins,
				isDarkRef,
				languageRef,
				customCoins,
				cancelPage: 'https://socfollwers.fun/stripe/cancel',
				successPage: 'https://socfollwers.fun/stripe/successful',
				checkoutRef,
				cashOutline,
				arrProducts,
				isPressedBuy,
				isOpenPayRef,
				processSheet,
				isActiveItem,
				onChangeTheme,
				personOutline,
				onChangeInput,
				setOpenLoader,
				stripeLoading,
				publishableKey: 'pk_test_51IU9pVECieeLlFGwYhtzGTIJA4qsaT3NAOjIOcQGYT9rJ2oFQXryhu4SNHgUQV1tg6aW2gli1XPjakiIyZQcstyI000hN7etHj',
				isOpenLoaderRef,
				languageOutline,
				checkmarkOutline,
				onSelectLanguage,
				createPaymentSheet,
				presentPaymentSheet,
				chevronForwardOutline,

			};
		}
	});
</script>
