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
import { Plugins,  PushNotification, PushNotificationToken, PushNotificationActionPerformed } from '@capacitor/core';
import { AdOptions } from 'capacitor-admob';

export default  {
	name: 'Tiktok',
	components: { Header, MakeOrder, IonPage, IonHeader, IonToolbar, IonTitle, IonContent },
	created() {
		const { AdMob, PushNotifications, FCMPlugin } = Plugins;

		FCMPlugin.isAutoInitEnabled().then((r: any) => {
			console.log('Auto init is ' + (r.enabled ? 'enabled' : 'disabled'));
		});

		PushNotifications.register();

		PushNotifications.addListener('registration',
			(token: PushNotificationToken) => {
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
				console.log('notifyRecevied:', notification)
			}
		);

		// Method called when tapping on a notification
		PushNotifications.addListener('pushNotificationActionPerformed',
			(notification: PushNotificationActionPerformed) => {
				console.log('notifyPerformed:', notification)
			}
		);

		if (isPlatform('android')) {
			const showRewardVideo = () => {
				AdMob.showRewardVideoAd().then(
					(value: any) => {
						console.log('Showed ad:', value);  // true
					},
					(error: any) => {
						console.error('Admob Error:', error); // show error
					}
				);
			};

			const prepareRewardVideo = () => {
				const options: AdOptions = {
					adId: 'ca-app-pub-7650228313887885/4950127471',
					autoShow: false
				}
				AdMob.prepareRewardVideoAd(options)
					.then(
						async (value: any) => {
							showRewardVideo();

							console.log('Prepared ad:', value);  // true
						},
						(error: any) => {
							console.error('Admob Error:', error); // show error
						}
					);
			};
			prepareRewardVideo();
		}
	}
}
</script>
