<template>
	<div id="container">
		<ion-list>
			<ion-list-header>
				<ion-label>
					<h1><b>Тип накрутки</b></h1>
					<h3><p v-html="messagesRef.type" class="input-error"></p></h3>
				</ion-label>
			</ion-list-header>
			<ion-item lines="full">
				<ion-radio-group v-model="formRef.type">
					<ion-item>
						<ion-label>Лайки</ion-label>
						<ion-radio slot="start" value="like"></ion-radio>
					</ion-item>
					<ion-item lines="none">
						<ion-label>Подписчики</ion-label>
						<ion-radio slot="start" value="subs"></ion-radio>
					</ion-item>
				</ion-radio-group>
			</ion-item>
			<ion-list-header>
				<ion-label>
					<h1><b>Ссылка/Никнейм</b></h1>
					<h3><p v-html="messagesRef.link" class="input-error"></p></h3>
				</ion-label>
			</ion-list-header>
			<ion-item lines="full">
				<ion-input placeholder="@userName" v-model="formRef.link"></ion-input>
			</ion-item>
			<ion-list-header>
				<ion-label>
					<h1><b>Количество</b></h1>
					<h3><p v-html="messagesRef.quantity" class="input-error"></p></h3>
				</ion-label>
			</ion-list-header>
			<ion-item lines="full">
				<ion-range v-model="formRef.quantity" min="20" max="10000" color="secondary">
					<ion-label slot="start" v-text="formRef.quantity"></ion-label>
					<ion-label slot="end">10000</ion-label>
				</ion-range>
			</ion-item>
			<ion-item lines="none">
				<ion-label>Итого: {{ formRef.quantity * 10 }} coins</ion-label>
			</ion-item>
			<div class="form-button">
				<ion-button @click="makeOrder" size="default" expand="full" shape="round">Купить</ion-button>
			</div>
		</ion-list>
		<ion-alert
			:is-open="isOpenRef"
			header="Успешно"
			:message="messageRef"
			:buttons="['Хорошо']"
			@onDidDismiss="setOpen(false)"
		>
		</ion-alert>
	</div>
</template>

<script lang="ts">
	import {
		IonInput,
		IonRange,
		IonLabel,
		IonList,
		IonItem,
		IonAlert,
		IonRadio,
		IonButton,
		IonRadioGroup,
		IonListHeader,
		alertController,
	} from '@ionic/vue';
	import axios from 'axios';
	import { defineComponent, ref } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	
	export default defineComponent({
		name: 'MakeOrder',
		props: {
			title: String,
		},
		components: {
			IonInput,
			IonRange,
			IonLabel,
			IonList,
			IonItem,
			IonAlert,
			IonRadio,
			IonButton,
			IonRadioGroup,
			IonListHeader,
		},
		setup(props) {
			const router = useRouter();
			const { params } = useRoute();
			const social = props.title?.toLowerCase();

			const formRef = ref<any>({
				type: 'like',
				social: social,
				quantity: 20,
			});
			const isOpenRef = ref(false);
			const setOpen = (state: boolean) => isOpenRef.value = state;

			const messageRef = ref<string|null>(null);
			const messagesRef = ref<any>({});

			const makeOrder = () => {
				axios.post('order/create', formRef.value).then(response => {
					const { data } = response;

					if (data.message) {
						messageRef.value = data.message;
						setOpen(true);
					}
					console.log(response.data);
				}).catch(async(error) => {
					const { response } = error;

					if (response.status == 401) {
						router.replace({name: 'Error', params: {
							code: response.status,
							message: response.statusText
						}});
					} else if (response.data) {
						const { data } = response;

						if (data.messages) {
							for(const i in data.messages) {
								const item = data.messages[i];

								messagesRef.value[i] = item[0];
							}

							setTimeout(() => {
								messagesRef.value = {};
							}, 4000);
						} else if (data.message) {
							const alert = await alertController
								.create({
									header: 'Error',
									message: `<p class="text-danger">${data.message}</p>`,
								});
							return alert.present();
						}
					} else {
						const alert = await alertController
							.create({
								header: 'Error',
								message: `<p class="text-danger">Server error.</p>`,
							});
						return alert.present();
					}
				});
			};

			if (params.type) {
				formRef.value = params;
			}
			return { formRef, useRoute, makeOrder, messageRef, messagesRef, isOpenRef, setOpen };
		}
	});
</script>

<style type="text/css">
	.form-button {
		padding-top: var(--ion-padding, 16px);
		padding-left: var(--ion-padding, 16px);
		padding-right: var(--ion-padding, 16px);
	}

	.input-error {
		color: #eb445a;
		padding: 0 4px;
		font-size: small;
	}
</style>
