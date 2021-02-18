<template>
	<ion-page>
		<Header title="Youtube" />
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Youtube</ion-title>
				</ion-toolbar>
			</ion-header>

			<MakeOrder key="youtube" title="Youtube" />
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import MakeOrder from '@/components/MakeOrder.vue';
import Header from '@/components/Header.vue';

export default  {
	name: 'Youtube',
	components: { Header, MakeOrder, IonPage, IonHeader, IonToolbar, IonTitle, IonContent },
}
</script>
