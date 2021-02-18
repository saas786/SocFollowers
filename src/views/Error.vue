<template>
	<ion-page>
		<ion-header v-if="false">
			<ion-toolbar>
				<ion-title>Error</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense" v-if="false">
				<ion-toolbar>
					<ion-title size="large">Error</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-grid>
				<ion-row class="ion-text-center">
					<ion-col>
						<h1><ion-text color="danger">Oops, {{ errorRef.code }}</ion-text></h1>
						<p class="text-muted">{{ errorRef.message }}</p>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import {
		IonGrid,
		IonRow,
		IonCol,
		IonPage,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
	} from '@ionic/vue';
	import { defineComponent, ref } from 'vue';
    import { useRoute } from 'vue-router';

	export default defineComponent({
		name: 'Error',
		components: {
			IonGrid,
			IonRow,
			IonCol,
			IonPage,
			IonTitle,
			IonHeader,
			IonToolbar,
			IonContent,
		},
        setup() {
            const errorRef = ref<any>({
                code: 500,
                message: 'Some error'
            });
            errorRef.value = useRoute().params;

            return {
                errorRef
            };
        }
	});
</script>

<style>
	ion-grid {
		height: calc(100vh - 200px);
	}
	ion-row {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
</style>