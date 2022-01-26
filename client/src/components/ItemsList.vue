<template>
	<h2>Items</h2>
	<ul>
		<router-link :to="{ name: 'Item', params: { collectionId, id: item.id } }" v-for="item in items">
			<li>{{ item.id }}. {{ item.name }}</li>
		</router-link>
	</ul>

	<Pagination :current="page" :pages="pages" />

	<select :value="ordering" @change="routeParam('ordering', ($event.target as HTMLSelectElement).value)">
		<option v-for="item in Ordering" :value="item">{{ item }}</option>
	</select>
	<select :value="orderingField" @change="routeParam('orderingField', ($event.target as HTMLSelectElement).value)">
		<option v-for="item in ORDERING_FIELDS" :value="item">{{ item }}</option>
	</select>
	<br />
	<input
		type="text"
		placeholder="Text search"
		:value="textSearch"
		@input="routeParam('text', ($event.target as HTMLInputElement).value)"
	/>
	<br />
	<select :value="quantityComparison" @change="routeQuantityComparison(($event.target as HTMLSelectElement).value)">
		<option :value="'disabled'">Disabled</option>
		<option v-for="item in Comparisons" :value="item">{{ item }}</option>
	</select>
	<input
		type="number"
		ref="quantityInput"
		:disabled="quantityComparison === 'disabled'"
		:value="quantity"
		@input="routeParam('quantity', ($event.target as HTMLInputElement).value)"
	/>

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
import { Ordering, Comparisons, useAddItemMutation, useSearchItemsQuery } from '@/graphql/graphql';
import { computed, reactive, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Pagination from './Pagination.vue';
import BarcodeScanner from './BarcodeScanner.vue';


const props = defineProps({
	collectionId: {
		type: Number,
		required: true
	}
})

const router = useRouter()
const route = useRoute()

const routeParam = (name: string, value: string | undefined) => {
	router.push({ ...route, query: { ...route.query, [name]: value ? value : undefined } })
}

const page = computed(() => typeof route.query.page === 'string' ? parseInt(route.query.page) : 1)

const ordering = computed(() => typeof route.query.ordering === 'string' ? route.query.ordering : Ordering.Desc)
const ORDERING_FIELDS = ['id', 'name']
const orderingField = computed(() => typeof route.query.orderingField === 'string' ? route.query.orderingField : 'id')

const textSearch = computed(() => typeof route.query.text === 'string' ? route.query.text : '')

const quantityComparison = computed(() => typeof route.query.quantityComparison === 'string' ? route.query.quantityComparison as Comparisons : 'disabled')
const routeQuantityComparison = (newValue: Comparisons | string) => {
	if (newValue !== "disabled") router.push({ ...route, query: { ...route.query, quantityComparison: newValue, quantity: quantityInput?.value?.value } })
	else router.push({ ...route, query: { ...route.query, quantityComparison: undefined, quantity: undefined } })
}

const quantity = computed(() => typeof route.query.quantity === 'string' ? parseInt(route.query.quantity) : 1)
const quantityInput: Ref<HTMLInputElement | null> = ref(null);

const searchQuery = await useSearchItemsQuery({
	variables: {
		input: {
			collectionId: props.collectionId,
			// @ts-expect-error - Vue URQL can handle reactive variables
			text: textSearch,
			// @ts-expect-error - Vue URQL can handle reactive variables
			quantity: computed(() => quantityComparison.value !== "disabled" ? { value: quantity.value || 0, comparison: quantityComparison.value } : undefined)
		},
		ordering: {
			// @ts-expect-error - Vue URQL can handle reactive variables
			page,
			numberPerPage: 10,
			// @ts-expect-error - Vue URQL can handle reactive variables
			ordering,
			// @ts-expect-error - Vue URQL can handle reactive variables
			orderingField
		}
	}
})

const addItem = useAddItemMutation()
const items = computed(() => searchQuery.data.value?.search.items || [])
const pages = computed(() => searchQuery.data.value?.search.pages || 1)

if (page.value > pages.value)
	router.replace({ ...route, query: { ...route.query, page: undefined } })

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
