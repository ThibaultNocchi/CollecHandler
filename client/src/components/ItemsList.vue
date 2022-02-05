<template>
	<h2>Items</h2>
	<!-- <ul>
		<router-link :to="{ name: 'Item', params: { collectionId: item.collectionId, id: item.id } }" v-for="item in items">
			<li>{{ item.id }}. {{ item.name }}</li>
		</router-link>
	</ul>-->
	<v-table>
		<thead>
			<tr>
				<th class="text-left">ID</th>
				<th class="text-left">Item</th>
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
import { useSearchItemsQuery } from '@/graphql/graphql';
import { computed } from 'vue';
import searchQueryStore from '@/plugins/searchQuery';
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

</script>
