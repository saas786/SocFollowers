<template>
	<ion-page>
		<ion-tabs @ionTabsDidChange="afterTabChange">
			<ion-tab-bar slot="bottom">
				<ion-tab-button tab="tiktok" href="/tabs/tiktok">
					<ion-icon :icon="logoTiktok" />
					<ion-label>Tik-tok</ion-label>
				</ion-tab-button>
				<ion-tab-button tab="instagram" href="/tabs/instagram">
					<ion-icon :icon="logoInstagram" />
					<ion-label>Instagram</ion-label>
				</ion-tab-button>
				<ion-tab-button tab="twitch" href="/tabs/twitch">
					<ion-icon :icon="logoTwitch" />
					<ion-label>Twitch</ion-label>
				</ion-tab-button>
				<ion-tab-button tab="likee" href="/tabs/likee">
					<template v-if="isLikeeRef">
						<ion-icon src="/assets/icon/likee.svg" />
					</template>
					<template v-else>
						<ion-icon :icon="heart" />
					</template>
					<ion-label>Likee</ion-label>
				</ion-tab-button>
				<ion-tab-button tab="youtube" href="/tabs/youtube">
					<ion-icon :icon="logoYoutube" />
					<ion-label>Youtube</ion-label>
				</ion-tab-button>
			</ion-tab-bar>
		</ion-tabs>
	</ion-page>
</template>

<script lang="ts">
	import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
	import { logoYoutube, logoInstagram, logoTwitch, logoTiktok, heart } from 'ionicons/icons';
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
				isLikeeRef,
				logoYoutube,
				logoInstagram,
				logoTwitch,
				logoTiktok,
				heart
			}
		}
	});
</script>

<style>
	ion-tab-button#tab-button-youtube {
		--color-selected: red;
	}

	ion-tab-button#tab-button-twitch {
		--color-selected: #6441a5;
	}

	ion-tab-button#tab-button-instagram {
		--color-selected: #5851DB;
	}

	@media (prefers-color-scheme: light) {
		ion-tab-button#tab-button-tiktok {
			--color-selected: #000;
		}
	}

	@media (prefers-color-scheme: dark) {
		ion-tab-button#tab-button-tiktok {
			--color-selected: #4de8f4;
		}
	}
		
	ion-tab-button#tab-button-likee {
		--color-selected: #ff784b;
	}
</style>
