<template>
	<h2>Items</h2>
	<v-table>
		<thead>
			<tr>
				<th
					class="text-left pointer"
					@click="switchOrdering(OrderingFieldItem.Id)"
				>ID{{ getOrderingArrow(OrderingFieldItem.Id) }}</th>
				<th
					class="text-left pointer"
					@click="switchOrdering(OrderingFieldItem.Name)"
				>Item{{ getOrderingArrow(OrderingFieldItem.Name) }}</th>
				<th class="text-left">Quantity</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="item in items" :key="item.name" @click="routeItem(item.id)" class="pointer">
				<td>{{ item.id }}</td>
				<td>{{ item.name }}</td>
				<td>{{ item.quantity }}</td>
			</tr>
		</tbody>
	</v-table>

	<v-pagination :length="pages" @update:modelValue="onPageChange"></v-pagination>
</template>

<script setup lang="ts">
import { Ordering, OrderingFieldItem, useSearchItemsQuery } from '@/graphql/graphql';
import { computed } from 'vue';
import searchQueryStore, { DEFAULTS as SEARCH_DEFAULTS, routeItemOrdering } from '@/plugins/searchQuery';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
	collectionId: {
		type: Number,
		required: false
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
			orderingFieldItem: searchQueryStore.orderingFieldItem
		}
	}
})

const items = computed(() => searchQuery.data.value?.search.items || [])
const pages = computed(() => searchQuery.data.value?.search.pages || 1)

const router = useRouter()
const route = useRoute()

const onPageChange = (page: number) => {
	router.replace({ ...route, query: { ...route.query, page: page !== 1 ? page : undefined } })
}

const routeItem = (itemId: number) => {
	router.push({ name: 'Item', params: { collectionId: props.collectionId, id: itemId } })
}

const downArrow = "↓"
const upArrow = "↑"

const getOrderingArrow = computed(() => (field: OrderingFieldItem) => {
	if (searchQueryStore.orderingFieldItem.value === field) {
		if (searchQueryStore.ordering.value === Ordering.Asc) return upArrow
		else return downArrow
	}
})

const switchOrdering = (field: OrderingFieldItem) => {
	let newOrdering: undefined | Ordering = undefined
	if (searchQueryStore.orderingFieldItem.value === field) {
		newOrdering = searchQueryStore.ordering.value === Ordering.Asc ? Ordering.Desc : Ordering.Asc
	}
	routeItemOrdering({ ordering: newOrdering, orderingFieldItem: field })
}

</script>
