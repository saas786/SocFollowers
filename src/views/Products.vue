<template>
	<ion-page>
		<Header is-back title="Products" />
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Products</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-grid>
				<ion-row>
					<ion-col size="6">
						Test
					</ion-col>
					<ion-col size="6">
						Test
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import {
		IonCol,
		IonRow,
		IonGrid,
		IonPage,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent
	} from '@ionic/vue';
	import Header from '@/components/Header.vue';
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'Products',
		components: {
			IonCol,
			IonRow,
			IonGrid,
			Header,
			IonPage,
			IonHeader,
			IonToolbar,
			IonTitle,
			IonContent
		},
	});
</script>
