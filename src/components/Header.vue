<template>
	<ion-header>
		<ion-toolbar>
			<ion-buttons slot="start">
				<div v-if="isBack">
					<ion-back-button></ion-back-button>
				</div>
				<ion-menu-button v-else auto-hide="false"></ion-menu-button>
			</ion-buttons>
			<ion-buttons slot="primary">
				<ion-button router-link="/products">
					<ion-icon :icon="cashOutline"></ion-icon>
					<p :style="{marginLeft: '5px'}">{{ user.coins }}</p>
				</ion-button>
			</ion-buttons>
			<ion-title>{{ title }}</ion-title>
		</ion-toolbar>
	</ion-header>
</template>

<script lang="ts">
	import {
		IonIcon,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonButtons,
		IonButton,
		IonBackButton,
		IonMenuButton,
	} from '@ionic/vue';
	import { cashOutline, newspaperOutline } from 'ionicons/icons';
	import { defineComponent } from 'vue';
	import { mapGetters } from 'vuex';

	export default defineComponent({
		name: 'Header',
		props: {
			title: String,
			isBack: Boolean,
		},
		computed: {
			...mapGetters({user: 'getUserData'})
		},
		setup() {
			return {
				cashOutline,
				newspaperOutline
			};
		},
		components: {
			IonIcon,
			IonHeader,
			IonToolbar,
			IonTitle,
			IonButtons,
			IonButton,
			IonBackButton,
			IonMenuButton,
		},
	});
</script>
