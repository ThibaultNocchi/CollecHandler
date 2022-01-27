<template>
	<div>
		<a href="#" @click.prevent="onPrevious" v-if="searchQuery.page.value > 1">&lt;</a>
		<span v-else>&lt;</span>

		<template v-for="idx in pages">
			<a href="#" v-if="idx !== searchQuery.page.value" @click.prevent="onPage(idx)">{{ idx }}</a>
			<span v-else>{{ idx }}</span>
		</template>

		<a href="#" @click.prevent="onNext" v-if="searchQuery.page.value < props.pages">&gt;</a>
		<span v-else>&gt;</span>
	</div>
</template>

<script setup lang="ts">import searchQuery from '@/plugins/searchQuery';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
	pages: {
		type: Number,
		required: true
	}
})

const router = useRouter()
const route = useRoute()

const onPrevious = () => {
	router.push({ ...route, query: { ...route.query, page: searchQuery.page.value - 1 } })
}

const onNext = () => {
	router.push({ ...route, query: { ...route.query, page: searchQuery.page.value + 1 } })
}

const onPage = (event: number) => {
	router.push({ ...route, query: { ...route.query, page: event } })
}

</script>
