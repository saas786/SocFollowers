<template>
	<ion-app>
		<ion-menu side="start" type="push" menu-id="orders" content-id="main">
			<ion-header>
				<ion-toolbar>
					<ion-title>{{ $t('message.orders') }}</ion-title>
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
							<ion-label>{{ $t('message.active') }}</ion-label>
						</ion-segment-button>
						<ion-segment-button value="history">
							<ion-label>{{ $t('message.history') }}</ion-label>
						</ion-segment-button>
					</ion-segment>
				</ion-toolbar>
			</ion-header>
			<ion-content>
				<ion-list>
					<div v-if="segment == 'active'">
						<div v-if="Object.keys(activeOrders).length == 0">
							<ion-item class="ion-text-center" lines="none">
								{{ $t('message.is_empty') }}
							</ion-item>
						</div>
						<ion-item
							v-for="(order, key) in activeOrders"
							v-bind:key="key"
							lines="full"
						>
							<template color="danger" v-if="!order">
								<ion-label color="danger">{{ $t('message.order_not_loaded') }}</ion-label>
							</template>
							<template v-else>
								<ion-avatar v-if="false" slot="start">
									<img :src="'/assets/logos/' + order.social + '.png'">
								</ion-avatar>
								<ion-label>
									<h2 v-up-letter="0">{{ $t('socials.' + order.social) }}</h2>
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
										>{{ order.price }}</p>
									</ion-button>
								</ion-label>
							</template>
						</ion-item>
					</div>
					<div v-else>
						<div v-if="Object.keys(historyOrders).length == 0">
							<ion-item class="ion-text-center" lines="none">
								{{ $t('message.is_empty') }}
							</ion-item>
						</div>
						<ion-item
							v-for="(order, key) in historyOrders"
							v-bind:key="key"
							lines="full"
						>
							<template color="danger" v-if="!order">
								<ion-label color="danger">{{ $t('message.order_not_loaded') }}</ion-label>
							</template>
							<template v-else>
								<ion-avatar v-if="false" slot="start">
									<img :src="'/assets/logos/' + order.social + '.png'">
								</ion-avatar>
								<ion-label>
									<h2 v-up-letter>{{ $t('socials.' + order.social) }}</h2>
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
										>{{ order.price }}</p>
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
	import { defineComponent, onMounted } from 'vue';
	import { 
		people, 
		heart, 
		refresh, 
		cashOutline
	} from 'ionicons/icons';
	// import axios from 'axios';
	import moment from 'moment';
	import { useRouter } from 'vue-router';
	// import { Stripe } from '@capacitor-community/stripe';

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
			segment: 'active'
		}),
		methods: {
			async getOrders() {
				this.$http.get('order/getAll').then(response => {
					const { data } = response;

					data.orders.map((item: any) => {
						if (item !== false) {
							item.created_at = new Date(item.created_at).toISOString().
								replace(/T/, ' ').
								replace(/\..+/, '')// moment(item.created_at);
						}
						return item;
					});

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

					if (response) {
						if(response.status == 401) {
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
					} else {
						const alert = await alertController
							.create({
								header: 'Error',
								message: `<p class="text-danger">${error.message}</p>`,
							});
						return alert.present();
					}
				});
			},
			repeatOrder(order: any) {
				menuController.enable(true, 'orders');
				menuController.close();

				this.$router.push({name: order.social.charAt(0).toUpperCase() + order.social.slice(1), params: {
					type: order.type,
					link: order.link,
					social: order.social,
					quantity: order.count,
					reorder: 1,

				}});
			}
		},
		created() {
			// const { PushNotifications } = Plugins;

			this.getOrders();
			
			/*
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
						console.log(JSON.stringify(response));

						localStorage.setItem('pushToken', token.value);
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

			PushNotifications.addListener('pushNotificationReceived',
				(notification: PushNotification) => {
					console.log('notifyRecevied:', JSON.stringify(notification))
				}
			);

			PushNotifications.addListener('pushNotificationActionPerformed',
				(notification: PushNotificationActionPerformed) => {
					console.log('notifyPerformed:', JSON.stringify(notification))
				}
			);
			*/
		},
		setup() {
			const router = useRouter();

			/*
			Stripe.initialize({
				publishableKey: 'pk_test_51IU9pVECieeLlFGwYhtzGTIJA4qsaT3NAOjIOcQGYT9rJ2oFQXryhu4SNHgUQV1tg6aW2gli1XPjakiIyZQcstyI000hN7etHj'
			});
			*/

			onMounted(() => {
				const theme = localStorage.getItem('theme') ?? 'light';
				const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
				const newColorScheme = prefersDark.matches ? "dark" : "light";
				
				/* eslint-disable no-console */
				console.log(newColorScheme, theme, prefersDark);
				
				localStorage.setItem('theme', theme);
				document.body.classList.toggle('dark', theme == 'dark');

				prefersDark.addEventListener('change', e => {
					const newColorScheme = e.matches ? "dark" : "light";

					localStorage.setItem('theme', newColorScheme);

					document.body.classList.toggle('dark', newColorScheme == 'dark');
				});
			});

			const isAcceptedPrivacyAndTerms = localStorage.getItem(`isAcceptedPrivacyAndPerms`) ?? false;

			if (!isAcceptedPrivacyAndTerms) {
				// router.push({ name: 'PrivacyAndTerms' });
			}
			return { people, moment, heart, refresh, cashOutline };
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
