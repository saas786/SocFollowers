<template>
	<div id="container">
		<ion-list>
			<ion-list-header>
				<ion-label>
					<h1><b>Тип накрутки</b></h1>
					<h3><p v-html="messagesRef.type" class="input-error"></p></h3>
				</ion-label>
			</ion-list-header>
			<ion-item lines="full">
				<ion-radio-group v-model="formRef.type">
					<ion-item v-if="social != 'twitch'">
						<ion-label>Лайки</ion-label>
						<ion-radio slot="start" value="like"></ion-radio>
					</ion-item>
					<ion-item lines="none">
						<ion-label>Подписчики</ion-label>
						<ion-radio slot="start" value="subs"></ion-radio>
					</ion-item>
				</ion-radio-group>
			</ion-item>
			<ion-list-header>
				<ion-label>
					<h1><b>Ссылка/Никнейм</b></h1>
					<h3><p v-html="messagesRef.link" class="input-error"></p></h3>
				</ion-label>
			</ion-list-header>
			<ion-item lines="full">
				<ion-input placeholder="@userName" v-model="formRef.link"></ion-input>
			</ion-item>
			<ion-list-header>
				<ion-label>
					<h1><b>Количество</b></h1>
					<h3><p v-html="messagesRef.quantity" class="input-error"></p></h3>
				</ion-label>
			</ion-list-header>
			<ion-item lines="none">
				<ion-label position="stacked">Выберите</ion-label>
				<ion-range v-model="formRef.quantity" :min="min" max="10000" color="secondary">
					<ion-label slot="start" v-text="formRef.quantity"></ion-label>
					<ion-label slot="end">10000</ion-label>
				</ion-range>
			</ion-item>
			<ion-item lines="full">
				<ion-label position="stacked">или введите</ion-label>
				<ion-input type="number" v-model="formRef.quantity"></ion-input>
			</ion-item>
			<ion-item lines="none">
				<ion-label>Итого: {{ totalRef ?? 0 }} coins</ion-label>
				<ion-button @click="loadAd" slot="end" shape="round">
					+30 coins
				</ion-button>
			</ion-item>
			<div class="form-button">
				<ion-button @click="makeOrder" size="default" expand="full" shape="round">Купить</ion-button>
			</div>
		</ion-list>
		<ion-alert
			:is-open="isOpenRef"
			header="Success"
			:message="messageRef"
			:buttons="['OK']"
			@onDidDismiss="setOpen(false)"
		>
		</ion-alert>
	</div>
</template>

<script lang="ts">
	import {
		IonInput,
		IonRange,
		IonLabel,
		IonList,
		IonItem,
		IonAlert,
		IonRadio,
		IonButton,
		isPlatform,
		IonRadioGroup,
		IonListHeader,
		alertController,
	} from '@ionic/vue';
	import axios from 'axios';
	import { defineComponent, ref, watchEffect } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import { AdOptions } from 'capacitor-admob';
	import { Plugins } from '@capacitor/core';

	export default defineComponent({
		name: 'MakeOrder',
		props: {
			title: String,
		},
		components: {
			IonInput,
			IonRange,
			IonLabel,
			IonList,
			IonItem,
			IonAlert,
			IonRadio,
			IonButton,
			IonRadioGroup,
			IonListHeader,
		},
		setup(props) {
			const { AdMob } = Plugins;
			const router = useRouter();
			const { params } = useRoute();
			const social = props.title?.toLowerCase();
			const min = social == 'twitch' ? 100 : 20;

			const formRef = ref<any>({
				type: (social != 'twitch' ? 'like' : 'subs'),
				count: min,
				social: social,
				quantity: min,
			});
			const totalRef = ref(0.00);
			const isOpenRef = ref(false);
			const priceRef = ref<any>(0);
			const pricesRef = ref<any>({
				'instagram_like': "34.90",
				'instagram_subs': "44.90",
				'likee_like': "37.90",
				'likee_subs': "76.90",
				'tiktok_like': "30.90",
				'tiktok_subs': "30.90",
				'twitch_subs': "30.90",
			});
			const setOpen = (state: boolean) => isOpenRef.value = state;

			const messageRef = ref<string|null>(null);
			const messagesRef = ref<any>({});

			axios.get('user/getMyPrices').then(response => {
				const { data } = response;

				pricesRef.value = data.prices;
				priceRef.value = data.prices[social + '_' + formRef.value.type];
				totalRef.value = Math.floor(formRef.value.count * priceRef.value / 10);
			}).catch(async(error) => {
				const { response } = error;

				if (response.data) {
					const { data } = response;

					if (data.message) {
						const alert = await alertController
							.create({
								header: 'Error',
								message: `<p class="text-danger">${data.message}</p>`,
							});
						return alert.present();
					} else if (data.messages) {
						const alert = await alertController
							.create({
								header: 'Error',
								message: `<p class="text-danger">${data.messages[0]}</p>`,
							});
						return alert.present();
					}
				} else {
					const alert = await alertController
						.create({
							header: 'Error',
							message: `<p class="text-danger">Server error.</p>`,
						});
					return alert.present();
				}
			});

			const makeOrder = () => {
				axios.post('order/create', formRef.value).then(response => {
					const { data } = response;

					if (data.message) {
						messageRef.value = data.message;
						setOpen(true);
					}
					console.log(response.data);
				}).catch(async(error) => {
					const { response } = error;

					if (response.status == 401) {
						router.replace({name: 'Error', params: {
							code: response.status,
							message: response.statusText
						}});
					} else if (response.data) {
						const { data } = response;

						if (data.messages) {
							for(const i in data.messages) {
								const item = data.messages[i];

								messagesRef.value[i] = item[0];
							}

							setTimeout(() => {
								messagesRef.value = {};
							}, 4000);
						} else if (data.message) {
							const alert = await alertController
								.create({
									header: 'Error',
									message: `<p class="text-danger">${data.message}</p>`,
								});
							return alert.present();
						}
					} else {
						const alert = await alertController
							.create({
								header: 'Error',
								message: `<p class="text-danger">Server error.</p>`,
							});
						return alert.present();
					}
				});
			};

			const loadAd = async() => {
				if (isPlatform('android')) {
					const loadAd = () => {
						const options: AdOptions = {
							adId: 'ca-app-pub-7650228313887885/4950127471',
						}
						AdMob.prepareRewardVideoAd(options).then(
							(result: any) => {
								AdMob.showRewardVideoAd().then(
									(value: any) => {
										console.log('Showed ad:', JSON.stringify(value));
									},
									(error: any) => {
										console.error('Admob Error:', JSON.stringify(error));
									}
								);
								console.log('Prepared rewardVideo:', JSON.stringify(result))
							}, (error: any) => {
								console.error('Prepared Error:', JSON.stringify(error));
							}
						);
					};
					loadAd();

					AdMob.addListener('onAdFailedToLoad', async (error: any) => {
						console.error('AdFiledLoad:', JSON.stringify(error));
					});

					AdMob.addListener('onRewarded', async (result: any) => {
						axios.post('/user/updateTime', {time: (Math.floor(Date.now() / 1000) + 1)}).then((response: any) => {
							console.log('Set time', JSON.stringify(response));
						});
						console.log('onRewarded:' + (Math.floor(Date.now() / 1000) + 1), JSON.stringify(result));
					});
				} else {
					const alert = await alertController
						.create({
							header: 'Error',
							message: `<p class="text-danger">This feature is only available for Android</p>`,
						});
					return alert.present();
				}
			};

			watchEffect(() => {
				priceRef.value = pricesRef.value[social + '_' + formRef.value.type];
				
				if (formRef.value.quantity >= min && formRef.value.quantity <= 10000) {
					formRef.value.count = formRef.value.quantity;
					totalRef.value = Math.floor(formRef.value.count * priceRef.value / 10);
				}
				
				if (formRef.value.count >= min && formRef.value.count <= 10000) {
					formRef.value.quantity = formRef.value.count;
					totalRef.value = Math.floor(formRef.value.count * priceRef.value / 10);
				}
			});

			if (params.type) {
				formRef.value = params;
			}

			return { 
				min: min,
				loadAd,
				social: social,
				setOpen,
				formRef,
				useRoute,
				priceRef,
				totalRef,
				isOpenRef,
				makeOrder,
				messageRef,
				messagesRef,
			};
		}
	});
</script>

<style type="text/css">
	.form-button {
		padding-top: var(--ion-padding, 16px);
		padding-left: var(--ion-padding, 16px);
		padding-right: var(--ion-padding, 16px);
	}

	.input-error {
		color: #eb445a;
		padding: 0 4px;
		font-size: small;
	}
</style>
