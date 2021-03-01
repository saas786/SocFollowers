<template>
	<ion-app>
		<ion-menu side="start" type="overlay" menu-id="orders" content-id="main">
			<ion-header>
				<ion-toolbar>
					<ion-title>Заказы</ion-title>
					<ion-buttons slot="end">
						<ion-button fill="clear" @click="getOrders">
							<ion-icon :icon="refresh"></ion-icon>
						</ion-button>
					</ion-buttons>
				</ion-toolbar>
				<ion-toolbar>
					<ion-segment
						v-model="segment"
					>
						<ion-segment-button value="active">
							<ion-label>Активные</ion-label>
						</ion-segment-button>
						<ion-segment-button value="history">
							<ion-label>История</ion-label>
						</ion-segment-button>
					</ion-segment>
				</ion-toolbar>
			</ion-header>
			<ion-content>
				<ion-list>
					<div v-if="segment == 'active'">
						<div v-if="Object.keys(activeOrders).length == 0">
							<ion-item class="ion-text-center" lines="none">
								Пока что пусто.
							</ion-item>
						</div>
						<ion-item
							v-for="(order, key) in activeOrders"
							v-bind:key="key"
							lines="full"
						>
							<template color="danger" v-if="!order">
								<ion-label color="danger">Заказ не загружен</ion-label>
							</template>
							<template v-else>
								<ion-avatar slot="start">
									<img :src="'/assets/logos/' + order.social + '.png'">
								</ion-avatar>
								<ion-label>
									<h2 v-up-first-letter>{{ order.social }}</h2>
									<h3 class="text-muted">{{ order.created_at }}</h3>
									<ion-button fill="clear">
										<ion-icon
											:icon="(order.type == 'like' ? heart : people)"
										></ion-icon>
										<p
											:style="{marginLeft: '5px'}"
										>{{ order.count_done + '/' + order.count }}</p>
									</ion-button>
									<ion-button fill="clear">
										<ion-icon :icon="cashOutline"></ion-icon>
										<p
											:style="{marginLeft: '5px'}"
										>{{ order.count * 10 }}</p>
									</ion-button>
								</ion-label>
							</template>
						</ion-item>
					</div>
					<div v-else>
						<div v-if="Object.keys(historyOrders).length == 0">
							<ion-item class="ion-text-center" lines="none">
								Пока что пусто.
							</ion-item>
						</div>
						<ion-item
							v-for="(order, key) in historyOrders"
							v-bind:key="key"
							lines="full"
						>
							<template color="danger" v-if="!order">
								<ion-label color="danger">Заказ не загружен</ion-label>
							</template>
							<template v-else>
								<ion-avatar slot="start">
									<img :src="'/assets/logos/' + order.social + '.png'">
								</ion-avatar>
								<ion-label>
									<h2 v-up-first-letter>{{ order.social }}</h2>
									<h3 class="text-muted">{{ order.created_at }}</h3>
									<ion-button fill="clear">
										<ion-icon
											:icon="(order.type == 'like' ? heart : people)"
										></ion-icon>
										<p
											:style="{marginLeft: '5px'}"
										>{{ order.count }}</p>
									</ion-button>
									<ion-button fill="clear">
										<ion-icon :icon="cashOutline"></ion-icon>
										<p
											:style="{marginLeft: '5px'}"
										>{{ order.count * 10 }}</p>
									</ion-button>
								</ion-label>
								<ion-button fill="clear" @click="repeatOrder(order)">
									<ion-icon :icon="refresh"></ion-icon>
								</ion-button>
							</template>
						</ion-item>
					</div>
				</ion-list>
			</ion-content>
		</ion-menu>
		<ion-router-outlet id="main" />
	</ion-app>
</template>

<script lang="ts">
	import {
		IonApp,
		IonItem,
		IonIcon,
		IonList,
		IonMenu,
		IonLabel,
		IonTitle,
		IonAvatar,
		IonHeader,
		IonButton,
		IonButtons,
		IonSegment,
		IonContent,
		IonToolbar,
		menuController,
		IonRouterOutlet,
		alertController,
		IonSegmentButton,
	} from '@ionic/vue';
	import axios from 'axios';
	import { defineComponent } from 'vue';
	import { 
		Plugins,
		PushNotification,
		PushNotificationToken,
		PushNotificationActionPerformed
	} from '@capacitor/core';
	import { people, heart, refresh, cashOutline } from 'ionicons/icons';

	import store from './store';

	export default defineComponent({
		name: 'App',
		components: {
			IonApp,
			IonIcon,
			IonItem,
			IonList,
			IonMenu,
			IonLabel,
			IonTitle,
			IonAvatar,
			IonHeader,
			IonButton,
			IonButtons,
			IonSegment,
			IonContent,
			IonToolbar,
			IonRouterOutlet,
			IonSegmentButton,
		},
		data: () => ({
			activeOrders: [],
			historyOrders: [],
			segment: 'active',
			user: {},
		}),
		methods: {
			log(data: any) {
				console.log('log:', data);
			},
			async getOrders() {
				this.$http.get('https://rwinsdice.xyz/sanctum/csrf-cookie').then(csrfResponse => {
					console.log(csrfResponse);

					this.$http.get('order/getAll').then(response => {
						const { data } = response;

						this.activeOrders = data.orders.filter((item: any) => {
							if (item.done !== true && item !== false) {
								return true;
							}
						});

						this.historyOrders = data.orders.filter((item: any) => {
							if (item.done === true || item === false) {
								return true;
							}
						});
					}).catch(async(error) => {
						const { response } = error;

						if (response.status == 401) {
							this.$router.replace({name: 'Error', params: {
								code: response.status,
								message: response.statusText
							}});
						} else if (response.data) {
							const { data } = response;

							if (data.errorType == 'empty_data') {
								this.activeOrders = [];
								this.historyOrders = [];
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
				});
			},
			repeatOrder(order: any) {
				menuController.enable(true, 'orders');
				menuController.close();

				this.$router.push({name: order.social, params: {
					type: order.type,
					link: order.link,
					quantity: order.count
				}});
			}
		},
		created() {
			const { PushNotifications } = Plugins;
			const json: any = localStorage.getItem('user');

			this.user = JSON.parse(json);

			store.commit('setUser', this.user);

			this.getOrders();
		
			PushNotifications.requestPermission().then((result: any) => {
				if (result.granted) {
					PushNotifications.register();
				} else {
					console.error('Права для push уведомлений не выданы')
				}
			});

			PushNotifications.addListener('registration',
				(token: PushNotificationToken) => {
					axios.post('user/subscribe', {token: token.value}).then((response: any) => {
						localStorage.setItem('pushToken', token.value);
						// console.log(JSON.stringify(response));
					}).catch((error: any) => {
						console.error(JSON.stringify(error.response));
					});
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
		},
		setup() {
			return { people, heart, refresh, cashOutline };
		}
	});
</script>

<style type="text/css">
	#count {
		padding-top: 5px;
	}

	label.custom {
		position: relative;
		top: -2px;
	}

	.text-danger {
		color: var(--ion-color-danger)!important;
	}
</style>
