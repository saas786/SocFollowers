<template>
	<ion-page>
		<Header title="Tiktok" />
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Tiktok</ion-title>
				</ion-toolbar>
			</ion-header>
			
			<MakeOrder key="tiktok" title="Tiktok" />
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, isPlatform } from '@ionic/vue';
import MakeOrder from '@/components/MakeOrder.vue';
import Header from '@/components/Header.vue';
import axios from 'axios';
import { Plugins,  PushNotification, PushNotificationToken, PushNotificationActionPerformed } from '@capacitor/core';
import { AdOptions, AdSize, AdPosition } from 'capacitor-admob';

export default  {
	name: 'Tiktok',
	components: { Header, MakeOrder, IonPage, IonHeader, IonToolbar, IonTitle, IonContent },
	created() {
		const { AdMob, PushNotifications } = Plugins;

		PushNotifications.requestPermission().then(result => {
			if (result.granted) {
				PushNotifications.register();
			} else {
				console.error('Права для push уведомлений не выданы')
			}
		});

		PushNotifications.addListener('registration',
			(token: PushNotificationToken) => {
				axios.post('user/subscribe', {token: token.value}).then((response: any) => {
					console.log(JSON.stringify(response));
				}).catch((error: any) => {
					console.error(JSON.stringify(error.response));
				});
				
				console.log('Push registration success, token: ' + token.value);
			}
		);

		PushNotifications.addListener('registrationError',
			(error: any) => {
				console.error('Error on registration: ' + JSON.stringify(error));
			}
		);

		// Show us the notification payload if the app is open on our device
		PushNotifications.addListener('pushNotificationReceived',
			(notification: PushNotification) => {
				console.log('notifyRecevied:', JSON.stringify(notification))
			}
		);

		// Method called when tapping on a notification
		PushNotifications.addListener('pushNotificationActionPerformed',
			(notification: PushNotificationActionPerformed) => {
				console.log('notifyPerformed:', JSON.stringify(notification))
			}
		);

		if (isPlatform('android')) {
			const loadAd = () => {
				const options: AdOptions = {
					adId: 'ca-app-pub-7650228313887885/4950127471'// 'ca-app-pub-3940256099942544/6300978111',
				}
				AdMob.prepareRewardVideoAd(options).then(
					(result: any) => {
						AdMob.showRewardVideoAd().then(
							(value: any) => {
								console.log('Showed ad:', JSON.stringify(value));  // true
							},
							(error: any) => {
								console.error('Admob Error:', JSON.stringify(error)); // show error
							}
						);
						console.log('Prepared rewardVideo:', JSON.stringify(result))
					}, (error: any) => {
						console.error('Prepared Error:', JSON.stringify(error));
					}
				);
			};
			loadAd();

			AdMob.addListener('onAdLoaded', async (info: boolean) => {
				console.log('Showing TabBar Banner AD.', info);
			});

			AdMob.addListener('onAdFailedToLoad', async (error: any) => {
				console.log('AdFiledLoad:', JSON.stringify(error));
			});
		}
	}
}
</script>
