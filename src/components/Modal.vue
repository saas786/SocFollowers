<template>
	<ion-header>
		<ion-toolbar>
			<ion-title>{{ title }}</ion-title>
			<ion-buttons slot="end">
				<ion-button @click="dismissModal">
					<ion-icon size="large" :icon="closeOutline"></ion-icon>
				</ion-button>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>
	<ion-content :fullscreen="true">
		<slot></slot>
	</ion-content>
</template>

<script>
	import {
		IonContent, 
		IonHeader, 
		IonTitle, 
		IonToolbar, 
		IonButtons,
		IonButton, 
		IonIcon 
	} from '@ionic/vue';
	import { closeOutline } from 'ionicons/icons';
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'Modal',
		props: {
			title: {
				type: String,
				default: 'Modal'
			}
		},
		methods: {
			dismissModal() {
				this.$emit('close-modal', true);
			}
		},
		components: {
			IonContent,
			IonHeader, 
			IonTitle, 
			IonToolbar, 
			IonButtons, 
			IonButton, 
			IonIcon
		},
		setup() {
			//	const segmentRef = ref('privacyPolicy');

			return {
				closeOutline
			};
		}
	});
</script>
