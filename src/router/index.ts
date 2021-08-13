import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/tabs/news'
	},
	{
		name: 'Settings',
		path: '/settings',
		component: () => import('@/views/Settings.vue')
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
		name: 'Likee',
		path: '/main/likee',
		component: () => import('@/views/Main.vue')
	},
	{
		name: 'Tiktok',
		path: '/main/tiktok',
		component: () => import('@/views/Main.vue')
	},
	{
		name: 'Instagram',
		path: '/main/instagram',
		component: () => import('@/views/Main.vue')
	},
	{
		name: 'Twitch',
		path: '/main/twitch',
		component: () => import('@/views/Main.vue')
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
			/*{
				name: 'Main',
				path: 'main/:type',
				component: () => import('@/views/Main.vue')
			},*/
		]
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
