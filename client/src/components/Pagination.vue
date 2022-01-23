<template>
	<div>
		<a href="#" @click.prevent="onPrevious" v-if="props.current > 1">&lt;</a>
		<span v-else>&lt;</span>

		<template v-for="idx in pages">
			<a href="#" v-if="idx !== current" @click.prevent="onPage(idx)">{{ idx }}</a>
			<span v-else>{{ idx }}</span>
		</template>

		<a href="#" @click.prevent="onNext" v-if="props.current < props.pages">&gt;</a>
		<span v-else>&gt;</span>
	</div>
</template>

<script setup lang="ts">import { useRoute, useRouter } from 'vue-router';



const props = defineProps({
	current: {
		type: Number,
		required: true
	},
	pages: {
		type: Number,
		required: true
	}
})

const router = useRouter()
const route = useRoute()

const onPrevious = () => {
	router.push({ ...route, query: { ...route.query, page: props.current - 1 } })
}

const onNext = () => {
	router.push({ ...route, query: { ...route.query, page: props.current + 1 } })
}

const onPage = (event: number) => {
	router.push({ ...route, query: { ...route.query, page: event } })
}

</script>
