<template>
	<ion-page>
		<Header is-not-back :title="$t('socials.' + type)" />
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">{{ $t('socials.' + type) }}</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-grid>
				<ion-row class="d-flex ion-justify-content-center">
					<ion-col size-xs="12" size-sm="11" size-md="9" size-lg="7" size-xl="5">
						<MakeOrder :key="type" :title="$t('socials.' + type)" />
					</ion-col>
				</ion-row>
			</ion-grid>
			
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import { IonGrid, IonRow, IonCol, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
	import MakeOrder from '@/components/MakeOrder.vue';
	import Header from '@/components/Header.vue';
	import { defineComponent } from 'vue';
	import { useRoute } from 'vue-router';

	export default defineComponent({
		name: 'Main',
		components: { IonGrid, IonRow, IonCol, Header, MakeOrder, IonPage, IonHeader, IonToolbar, IonTitle, IonContent },
		setup() {
			const { path } = useRoute();

			return {
				type: path.replace(/\/main\//i, '')
			}
		}
	});
</script>
