<template>
	<ion-page>
		<ion-tabs @ionTabsDidChange="afterTabChange">
			<ion-tab-bar slot="bottom">
				<ion-tab-button tab="news" href="/tabs/news">
					<ion-icon icon="/assets/news.svg"></ion-icon>
					<ion-icon v-if="false" :icon="newspaper" />
					<ion-label>{{ $t('message.news') }}</ion-label>
				</ion-tab-button>
				<ion-tab-button tab="main" href="/tabs/main/tiktok">
					<ion-icon :icon="homeOutline" />
					<ion-label>{{ $t('message.main') }}</ion-label>
				</ion-tab-button>
			</ion-tab-bar>
		</ion-tabs>
	</ion-page>
</template>

<script lang="ts">
	import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
	import { newspaper, people, homeOutline } from 'ionicons/icons';
	import { defineComponent, ref } from 'vue';

	export default defineComponent({
		name: 'Tabs',
		components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
		setup() {
			const isLikeeRef = ref(false);
			const setIsLikee = (state: boolean) => isLikeeRef.value = state;
			const afterTabChange = (e: any) => {
				if (e.tab == 'likee') {
					setIsLikee(true);
				} else {
					setIsLikee(false);
				}
			};

			return {
				afterTabChange,
				homeOutline,
				isLikeeRef,
				newspaper,
				people,
			}
		}
	});
</script>

<style>
	ion-tab-button.tab-selected ion-icon {
		filter: invert(45%) sepia(53%) saturate(6041%) hue-rotate(211deg) brightness(111%) contrast(100%);
	}
</style>