<template>
	<div id="container">
		<ion-list>
			<ion-list-header>
				<ion-label>
					<h1><b>{{ t('message.social_net') }}</b></h1>
					<h3><p v-html="messagesRef.social" class="input-error"></p></h3>
				</ion-label>
			</ion-list-header>
			<ion-item lines="none">
				<ion-select @ionChange="onSelectChange" v-model="formRef.social" interface="popover">
					<ion-select-option value="tiktok">{{ t('socials.tiktok') }}</ion-select-option>
					<ion-select-option value="instagram">{{ t('socials.instagram') }}</ion-select-option>
					<ion-select-option value="likee">{{ t('socials.likee') }}</ion-select-option>
					<ion-select-option value="twitch">{{ t('socials.twitch') }}</ion-select-option>
				</ion-select>
			</ion-item>
			<ion-list-header>
				<ion-label>
					<h1><b>{{ t('message.type_of_cheat') }}</b></h1>
					<h3><p v-html="messagesRef.type" class="input-error"></p></h3>
				</ion-label>
			</ion-list-header>
			<ion-item lines="none">
				<ion-radio-group mode="md" v-model="formRef.type">
					<ion-item v-if="social != 'twitch'" lines="none">
						<ion-label>{{ t('message.likes') }}</ion-label>
						<ion-radio mode="md" slot="start" value="like"></ion-radio>
					</ion-item>
					<ion-item lines="none">
						<ion-label>{{ t('message.subscribers') }}</ion-label>
						<ion-radio mode="md" slot="start" value="subs"></ion-radio>
					</ion-item>
				</ion-radio-group>
			</ion-item>
			<ion-list-header>
				<ion-label>
					<h1><b>{{ t('message.link_nickname') }}</b></h1>
					<h3><p v-html="messagesRef.link" class="input-error"></p></h3>
				</ion-label>
			</ion-list-header>
			<ion-item lines="none">
				<ion-input class="custom" placeholder="@userName" v-model="formRef.link"></ion-input>
			</ion-item>
			<ion-list-header>
				<ion-label>
					<h1><b>{{ t('message.quantity') }}</b></h1>
					<h3><p v-html="messagesRef.quantity" class="input-error"></p></h3>
				</ion-label>
			</ion-list-header>
			<ion-item lines="none">
				<ion-label position="stacked">{{ t('message.select') }}</ion-label>
				<ion-range v-model="formRef.quantity" :min="min" max="10000" color="secondary">
					<ion-label slot="start" v-text="formRef.quantity"></ion-label>
					<ion-label slot="end">10000</ion-label>
				</ion-range>
			</ion-item>
			<ion-item lines="none">
				<ion-label position="stacked">{{ t('message.or_enter') }}</ion-label>
				<ion-input class="custom" type="number" v-model="formRef.quantity"></ion-input>
			</ion-item>
			<ion-item lines="none">
				<ion-label>{{ totalString }}</ion-label>
				<ion-button @click="loadAd" slot="end" shape="round">
					+30 {{ t('message.coin', 30) }}
				</ion-button>
			</ion-item>
			<div class="form-button">
				<ion-button @click="makeOrder" size="default" expand="full" shape="round" color="krayola">{{ t('message.buy') }}</ion-button>
			</div>
		</ion-list>
		<ion-alert
			:is-open="isOpenRef"
			header="Success"
			:message="messageRef"
			:buttons="['OK']"
			@didDismiss="setOpen(false)"
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
		IonSelect,
		IonButton,
		isPlatform,
		IonRadioGroup,
		IonListHeader,
		alertController,
		IonSelectOption,

	} from '@ionic/vue';
	
	import { 
		defineComponent, 
		watchEffect,
		ref, 
		
	} from 'vue';

	import { 
		AdMob, 
		RewardAdOptions, 
		AdLoadInfo, 
		RewardAdPluginEvents, 
		AdMobRewardItem, 
		AdMobError,

	} from '@capacitor-community/admob';

	import { useRoute, useRouter } from 'vue-router';
	import { useI18n } from "vue-i18n";
	import store from '@/store';
	import axios from 'axios';

	export default defineComponent({
		name: 'MakeOrder',
		components: {
			IonInput,
			IonRange,
			IonLabel,
			IonList,
			IonItem,
			IonAlert,
			IonRadio,
			IonButton,
			IonSelect,
			IonRadioGroup,
			IonListHeader,
			IonSelectOption,

		},
		setup() {
			const { t } = useI18n();
			const router = useRouter();
			const { params, path } = useRoute();
			const social: any = path.replace(/\/main\//i, '') ?? 'tiktok';
			const min = social == 'twitch' ? 100 : 20;

			const user = store.getters.getUserData;
			const formRef = ref<any>({
				type: params.type ? params.type : (social != 'twitch' ? 'like' : 'subs'),
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
			const totalString = ref<string|null>('');
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
					store.dispatch('updateUser');
				}).catch(async(error) => {
					const { response } = error;

					if (response.data) {
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

			AdMob.addListener(RewardAdPluginEvents.Loaded, (info: AdLoadInfo) => {
				/* eslint-disable no-console */
				console.log('Subscribe prepared rewardVideo:', info);
			});

			AdMob.addListener(RewardAdPluginEvents.Rewarded, (rewardItem: AdMobRewardItem) => {
				axios.post('/admob/rewardCheck', {
					user: user
				}).then((response) => {
					/* eslint-disable no-console */
					console.log("rewardCheck:", response);
				}).catch((error) => {
					/* eslint-disable no-console */
					console.log("Error check:", error.response);
				});
				/* eslint-disable no-console */
				console.log('rewardItem:', rewardItem);
			});

			AdMob.addListener(RewardAdPluginEvents.FailedToShow, (error: AdMobError) => {
				/* eslint-disable no-console */
				console.error('AdMob Error:', error);
			});

			AdMob.addListener(RewardAdPluginEvents.Dismissed, () => {
				/* eslint-disable no-console */
				console.log('Dismissed');
			});

			const loadAd = async() => {
				const options: RewardAdOptions = {
					adId: 'ca-app-pub-7650228313887885/4950127471',
					// isTesting: true,
					npa: true,
					ssv: {
						userId: user.id
					}
				};

				AdMob.prepareRewardVideoAd(options).then((response) => {
					/* eslint-disable no-console */
					console.log("preparedAd:", response);

					AdMob.showRewardVideoAd().then((response) => {
						/* eslint-disable no-console */
						console.log("showRewardItem:", response);
					});
				});

				if (isPlatform('android')) {
					

						/*if (error == 'AdMob does not have web implementation.') {
								const alert = await alertController
									.create({
										header: 'Error',
										message: `<p class="text-danger">This feature is only available for Android</p>`,
									});
								return alert.present();
							}
							console.error('Prepared Error:', JSON.stringify(error));*/
					/*AdMob.addListener('onRewarded', async (result: any) => {
						axios.post('/user/updateTime', {time: (Math.floor(Date.now() / 1000) + 1)}).then((response: any) => {
							console.log('Set time', JSON.stringify(response));
						});
						store.dispatch('updateUser');
					});*/

					
				} else {
					const alert = await alertController
						.create({
							header: 'Error',
							message: `<p class="text-danger">${t('message.only_android')}</p>`,
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
				totalString.value = t('message.total') + ': ' + totalRef.value + ' ' + t('message.coin', totalRef.value);
			});

			if (params.reorder) {
				formRef.value = params;
			}

			const onSelectChange = (e: any) => {
				router.replace({ path: `/main/${e.target.value}` });
			};

			return {
				t,
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
				totalString,
				onSelectChange
			};
		}
	});
</script>

<style type="text/css">
	.form-button {
		padding-top: 2px;
		padding-left: var(--ion-padding, 16px);
		padding-right: var(--ion-padding, 16px);
		padding-bottom: 0; /*var(--ion-padding, 10px);*/
	}

	.input-error {
		color: #eb445a;
		padding: 0 4px;
		font-size: small;
	}

	body.dark #container {
		background: rgb(28 28 28 / 61%) !important;
		border-radius: 8px;
		padding-bottom: 20px;
	}

	body.dark ion-item {
		--background: rgba(0, 0, 0, 0)!important;
	}
</style>
