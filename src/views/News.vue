<template>
	<ion-page>
		<Header :title="$t('message.news')" />
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">{{ $t('message.news') }}</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-refresher slot="fixed" pull-factor="0.5" pull-min="100" pull-max="200" @ionRefresh="doRefresh($event)">
				<ion-refresher-content></ion-refresher-content>
			</ion-refresher>
			<div v-if="isLoadRef">
				<ion-grid>
					<ion-row class="ion-justify-content-center ion-align-items-center centered-content">
						<ion-col size-xs="12" size-sm="8" size-md="5" size-xl="3" class="ion-text-center">
							<ion-spinner
								name="dots"
							></ion-spinner>
						</ion-col>
					</ion-row>
				</ion-grid>
			</div>
			<div v-else-if="newsRef == null">
				<ion-grid>
					<ion-row>
						<ion-col>
							<ion-card>
								<ion-card-content color="muted" class="ion-text-muted">
									{{ $t('message.is_empty') }}
								</ion-card-content>
							</ion-card>
						</ion-col>
					</ion-row>
				</ion-grid>
			</div>
			<ion-grid>
					<ion-row class="ion-justify-content-center ion-align-items-center centered-content">
						<ion-col size-xs="12" size-sm="10" size-md="8" size-lg="6" size-xl="4">
							<ion-card v-for="(news, i) in newsRef" v-bind:key="i" :style="{ marginBottom: '20px' }">
								<div
									v-if="news.img"
									class="card-image"
									:style="{backgroundImage: 'url(' + news.img + ')'}"
								></div>
								<svg v-else-if="false" class="bd-placeholder-img bd-placeholder-img-lg img-fluid" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" role="img" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">{{ $t('message.empty_photo') }}</text></svg>
								<ion-card-header>
									<ion-card-title>{{ locale == 'ru' && news.title_ru !== null ? news.title_ru : news.title }}</ion-card-title>
								</ion-card-header>
								<ion-card-content color="muted" class="d-flex ion-justify-content-between">
									<i>{{ moment(news.created_at).fromNow() }}</i>
									<b @click="getNewsInfo(news)">{{ $t('message.detailed') }}</b>
								</ion-card-content>
							</ion-card>
						</ion-col>
					</ion-row>
			</ion-grid>

			<ion-modal
				:is-open="isOpenRef"
			>
				<NewsModal
					v-on:close-modal="closeModal"
					v-bind:dataModal="dataModal"
				></NewsModal>
			</ion-modal>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import {
		IonCol,
		IonRow,
		IonGrid,
		IonPage,
		IonCard,
		IonCardTitle,
		IonCardHeader,
		IonCardContent,
		IonHeader, 
		IonToolbar, 
		IonTitle, 
		IonContent, 
		IonModal,
		IonSpinner,
		IonRefresher,
		IonRefresherContent,
	} from '@ionic/vue';
    import axios from 'axios';
    import moment from 'moment';
	import { defineComponent, ref } from 'vue';
    import Header from '@/components/Header.vue';
	import NewsModal from '@/components/NewsModal.vue';

	export default defineComponent({
		name: 'News',
		components: { 
			IonCol,
			IonRow,
			IonGrid,
			IonHeader, 
			IonToolbar, 
			IonTitle, 
			IonContent, 
			IonPage,
			IonCard,
			IonCardTitle,
			IonCardHeader,
			IonCardContent,
			IonModal, 
			NewsModal,
            Header,
			IonSpinner,
			IonRefresher,
			IonRefresherContent,
		},
		setup() {
			const locale = localStorage.getItem('locale') ?? 'en';
			
			moment.locale(locale);
			
			const newsRef   = ref<any>(null);
			const dataModal = ref<any>({});
			const isOpenRef = ref<boolean>(false);
			const isLoadRef = ref<boolean>(false);

			const getNews = (callback: any = null) => {
				if (!callback) isLoadRef.value = true;

				axios.get('news/getAll').then((response: any) => {
					const { data } = response;

					newsRef.value = data.news;

					if (callback) callback();
					isLoadRef.value = false;
				}).catch((error: any): void => {
					const { response } = error;

					if (callback) callback();
					
					isLoadRef.value = false;

					if (response.data.errorType == 'empty_data') {
						newsRef.value = null;
					} else {
						console.error(response);
					}
				});
			};

			const doRefresh = (event: any) => {
				getNews(() => {
					event.target.complete();
				});
			};

			const closeModal = () => {
				isOpenRef.value = false;
			};
			
			const getNewsInfo = (news: any) => {
				dataModal.value = news;
				isOpenRef.value = true;
			};

			getNews();
			
			return {
				locale: locale,
                moment,
				newsRef,
				isOpenRef, 
				isLoadRef,
				dataModal,
				doRefresh,
				closeModal, 
				getNewsInfo 
			};
		}
	});
</script>

<style scoped>
	.bd-placeholder-img-lg {
		font-size: calc(1.475rem + 2.7vw);
	}

	.bd-placeholder-img {
		font-size: 1.125rem;
		text-anchor: middle;
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
	}

	.img-fluid {
		max-width: 100%;
		height: 200px;
	}

	ion-col {
		--ion-grid-column-padding: 0;
		padding-bottom: 50px;
	}
	
</style>