<template>
	<ion-page>
		<Header is-not-back :title="$t('socials.' + type)" />
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">{{ $t('socials.' + type) }}</ion-title>
				</ion-toolbar>
			</ion-header>
			<MakeOrder :key="type" :title="$t('socials.' + type)" />
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
	import MakeOrder from '@/components/MakeOrder.vue';
	import Header from '@/components/Header.vue';
	import { defineComponent } from 'vue';
	import { useRoute } from 'vue-router';

	export default defineComponent({
		name: 'Main',
		components: { Header, MakeOrder, IonPage, IonHeader, IonToolbar, IonTitle, IonContent },
		setup() {
			const route = useRoute();

			return {
				type: route.params?.type
			}
		}
	});
</script>
