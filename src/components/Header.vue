<template>
	<ion-header>
		<ion-toolbar>
			<ion-buttons slot="start">
				<template v-if="isCustomBack && !isNotBack">
					<ion-button @click="goBack">
						<ion-icon slot="icon-only" :icon="chevronBackOutline"></ion-icon>
					</ion-button>
				</template>
				<ion-back-button v-else-if="!isCustomBack && !isNotBack"></ion-back-button>
				<ion-menu-button v-else auto-hide="false"></ion-menu-button>
			</ion-buttons>
			<ion-buttons v-if="!isSettings" slot="primary">
				<ion-button router-link="/settings">
					<ion-icon icon="/assets/settings.svg"></ion-icon>
				</ion-button>
			</ion-buttons>
			<ion-title>{{ title }}</ion-title>
		</ion-toolbar>
	</ion-header>
</template>

<script lang="ts">
	import {
		IonIcon,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonButtons,
		IonButton,
		IonBackButton,
		IonMenuButton,
	} from '@ionic/vue';
	import { settings, settingsSharp, newspaperOutline, chevronBackOutline } from 'ionicons/icons';
	import { useRouter } from 'vue-router';
	import { defineComponent } from 'vue';
	import { mapGetters } from 'vuex';

	export default defineComponent({
		name: 'Header',
		components: {
			IonIcon,
			IonHeader,
			IonToolbar,
			IonTitle,
			IonButtons,
			IonButton,
			IonBackButton,
			IonMenuButton,
			
		},
		props: {
			title: String,
			isNotBack: Boolean,
			isSettings: Boolean,
			isCustomBack: Boolean,

		},
		computed: {
			...mapGetters({user: 'getUserData'})
		},
		setup() {
			const router = useRouter();
			
			const goBack = () => {
				router.back();
			};

			return {
				goBack,
				settings,
				settingsSharp,
				newspaperOutline,
				chevronBackOutline,

			};
		},
		
	});
</script>
