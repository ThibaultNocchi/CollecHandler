<template>
	<h2>Items</h2>
	<ul>
		<router-link :to="{ name: 'Item', params: { collectionId, id: item.id } }" v-for="item in items">
			<li>{{ item.id }}. {{ item.name }}</li>
		</router-link>
	</ul>

	<Pagination :pages="pages" />

	<h3>Search</h3>
	<SearchForm />
</template>

<script setup lang="ts">
import { useSearchItemsQuery } from '@/graphql/graphql';
import { computed } from 'vue';
import Pagination from './Pagination.vue';
import SearchForm from './SearchForm.vue';
import searchQueryStore from '@/plugins/searchQuery';

const props = defineProps({
	collectionId: {
		type: Number,
		required: true
	}
})

const searchQuery = await useSearchItemsQuery({
	variables: {
		input: {
			collectionId: props.collectionId,
			// @ts-expect-error - Vue URQL can handle reactive variables
			text: searchQueryStore.text,
			// @ts-expect-error - Vue URQL can handle reactive variables
			barcode: searchQueryStore.barcode,
			// @ts-expect-error - Vue URQL can handle reactive variables
			quantity: computed(() => searchQueryStore.quantityComparison.value !== "disabled" ? { value: searchQueryStore.quantity.value || 0, comparison: searchQueryStore.quantityComparison.value } : undefined)
		},
		ordering: {
			// @ts-expect-error - Vue URQL can handle reactive variables
			page: searchQueryStore.page,
			numberPerPage: 10,
			// @ts-expect-error - Vue URQL can handle reactive variables
			ordering: searchQueryStore.ordering,
			// @ts-expect-error - Vue URQL can handle reactive variables
			orderingField: searchQueryStore.orderingField
		}
	}
})

const items = computed(() => searchQuery.data.value?.search.items || [])
const pages = computed(() => searchQuery.data.value?.search.pages || 1)

</script>
