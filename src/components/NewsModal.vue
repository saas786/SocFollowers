<template>
	<ion-header>
		<ion-toolbar>
			<ion-title>{{ $t('message.news') }}</ion-title>
			<ion-buttons slot="end">
				<ion-button @click="dismissModal">
					<ion-icon size="large" :icon="closeOutline"></ion-icon>
				</ion-button>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>
	<ion-content :fullscreen="true" class="ion-padding-horizontal text-content">
		<h1>{{ locale == 'ru' && dataModal.title_ru !== null ? dataModal.title_ru : dataModal.title }}</h1>
		<div
			v-if="dataModal.img"
			class="card-image"
			:style="{backgroundImage: 'url(' + dataModal.img + ')'}"
		></div>
		<p v-if="dataModal.created_at" class="text-muted" style="padding-left: 10px;">
			<ion-icon class="icon-position" :icon="time"></ion-icon> <small>{{ moment(dataModal.created_at).fromNow() }}</small>
		</p>
		<p>{{ locale == 'ru' && dataModal.text_ru !== null ? dataModal.text_ru : dataModal.text }}</p>
	</ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/vue';
import { time, closeOutline } from 'ionicons/icons';
import { defineComponent } from 'vue';
import moment from 'moment';

export default defineComponent({
	name: 'NewsModal',
	props: {
		dataModal: { type: Function, default: () => 1 }
	},
	methods: {
		dismissModal() {
			this.$emit('close-modal', true);
		}
	},
	components: { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon },
	setup() {
		const locale = localStorage.getItem('locale') ?? 'en';
			
		moment.locale(locale);

		return {
			time, 
			moment, 
			locale: locale,
			closeOutline,
		};
	}
});
</script>
