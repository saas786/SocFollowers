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
	import { defineComponent } from 'vue';
	
	export default defineComponent({
		name: 'Tiktok',
		components: { Header, MakeOrder, IonPage, IonHeader, IonToolbar, IonTitle, IonContent },
	});
</script>
