<template>
	<ion-page>
		<Header title="Instagram" />
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Instagram</ion-title>
				</ion-toolbar>
			</ion-header>

			<MakeOrder key="instagram" title="Instagram" />
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import {
		IonPage,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent
	} from '@ionic/vue';
	import MakeOrder from '@/components/MakeOrder.vue';
	import Header from '@/components/Header.vue';

	export default  {
		name: 'Instagram',
		components: {
			Header,
			MakeOrder,
			IonPage,
			IonHeader,
			IonToolbar,
			IonTitle,
			IonContent
		},
	}
</script>
