<template>
	<ion-page>
		<Header is-not-back title="Instagram"></Header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Профиль</ion-title>
				</ion-toolbar>
			</ion-header>
			текст
		</ion-content>
	</ion-page>
</template>

<script>
	import {
		IonPage,
		IonTitle,
		IonHeader,
		IonToolbar,
		IonContent,

	} from '@ionic/vue';

	import { 
		defineComponent,

	} from 'vue';

	import Header from '@/components/Header.vue';

	export default defineComponent({
		components: {
			IonToolbar,
			IonContent,
			IonHeader,
			IonTitle,
			IonPage,
			Header,

		},
		name: 'Profile',
		setup() {

			//
		},
	});
</script>

<style scoped>

</style>