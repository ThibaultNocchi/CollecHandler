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

	<h3>Add new item</h3>
	<form @submit.prevent="onSubmit">
		<input type="text" placeholder="Name" v-model="form.name" />
		<br />
		<input type="number" min="0" placeholder="Quantity" v-model="form.quantity" />
		<br />
		<input type="text" placeholder="Barcode" v-model="form.barcode" />
		<BarcodeScanner @change="onNewItemBarcodeChange" />
		<br />
		<textarea placeholder="Description" v-model="form.description"></textarea>
		<br />
		<input type="submit" />
	</form>
</template>

<script setup lang="ts">
import { useAddItemMutation, useSearchItemsQuery } from '@/graphql/graphql';
import { computed, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Pagination from './Pagination.vue';
import BarcodeScanner from './BarcodeScanner.vue';
import SearchForm from './SearchForm.vue';
import searchQueryStore from '@/plugins/searchQuery';

const props = defineProps({
	collectionId: {
		type: Number,
		required: true
	}
})

const router = useRouter()
const route = useRoute()

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

const addItem = useAddItemMutation()
const items = computed(() => searchQuery.data.value?.search.items || [])
const pages = computed(() => searchQuery.data.value?.search.pages || 1)

const form = reactive({
	name: '',
	quantity: 1,
	barcode: '',
	description: ''
})


const onSubmit = async () => {
	const addItemMutation = await addItem.executeMutation({
		collectionId: props.collectionId, input: {
			name: form.name,
			quantity: form.quantity,
			barcode: form.barcode || undefined,
			description: form.description || undefined
		}
	}, { additionalTypenames: ['Collection'] })
	if (addItemMutation.data?.addItem?.id)
		router.push({ name: 'Item', params: { collectionId: props.collectionId, id: addItemMutation.data.addItem.id } })
	else
		alert('error adding item')
}

const onNewItemBarcodeChange = (val: string | undefined) => {
	if (val) form.barcode = val
	else alert('Can\'t read barcode, try again')
}

</script>
