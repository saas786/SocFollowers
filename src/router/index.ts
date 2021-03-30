import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/tabs/news'
	},
	{
		name: 'Products',
		path: '/products',
		component: () => import('@/views/Products.vue')
	},
	{
		name: 'PrivacyAndTerms',
		path: '/privacy_terms',
		component: () => import('@/views/PrivacyAndTerms.vue')
	},
	{
		name: 'Error',
		path: '/error',
		component: () => import('@/views/Error.vue')
	},
	{
		path: '/tabs/',
		component: Tabs,
		children: [
			{
				path: '',
				redirect: '/tabs/news'
			},
			{
				name: 'News',
				path: 'news',
				component: () => import('@/views/News.vue')
			},
			{
				path: 'tiktok',
				name: 'tiktok',
				component: () => import('@/views/Tiktok.vue')
			},
			{
				path: 'instagram',
				name: 'instagram',
				component: () => import('@/views/Instagram.vue')
			},
			{
				path: 'twitch',
				name: 'twitch',
				component: () => import('@/views/Twitch.vue')
			},
			{
				path: 'likee',
				name: 'likee',
				component: () => import('@/views/Likee.vue')
			}
		]
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
