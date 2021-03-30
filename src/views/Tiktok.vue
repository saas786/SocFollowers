<template>
	<ion-page>
		<Header title="Tiktok" />
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">{{ t('socials.tiktok') }}</ion-title>
				</ion-toolbar>
			</ion-header>
			<MakeOrder key="tiktok" :title="t('socials.tiktok')" />
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
	import MakeOrder from '@/components/MakeOrder.vue';
	import Header from '@/components/Header.vue';
	import { defineComponent } from 'vue';
	import { useI18n } from 'vue-i18n';

	export default defineComponent({
		name: 'Tiktok',
		components: { Header, MakeOrder, IonPage, IonHeader, IonToolbar, IonTitle, IonContent },
		setup() {
			const { t } = useI18n();

			return { t };
		}
	});
</script>
