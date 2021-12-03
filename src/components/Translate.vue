<template>
	<span>
		{{ text }}
	</span>
</template>

<script>
	import { defineComponent, ref, toRefs } from 'vue';

	export default defineComponent({
		props: ['en', 'ru'],
		setup(props) {
			const text = ref('');
			const langs = toRefs(props);
			const locale = localStorage.getItem('locale') ?? 'en';
			
			if (langs[locale]) {
				text.value = langs[locale].value;
			} else {
				text.value = langs['en'].value;
			}
			
			return {
				text
			};
		}
	})
</script>
