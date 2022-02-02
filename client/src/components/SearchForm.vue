<template>
	<label>Ordering</label>
	<select
		:value="searchQuery.ordering.value"
		@change="routeSearchQuery('ordering', ($event.target as HTMLSelectElement).value)"
	>
		<option v-for="item in Ordering" :value="item">{{ item }}</option>
	</select>
	<select
		:value="searchQuery.orderingFieldItem.value"
		@change="routeSearchQuery('orderingFieldItem', ($event.target as HTMLSelectElement).value)"
	>
		<option v-for="item in OrderingFieldItem" :value="item">{{ item }}</option>
	</select>

	<br />

	<input
		type="text"
		placeholder="Text search"
		:value="searchQuery.text.value"
		@input="routeSearchQuery('text', ($event.target as HTMLInputElement).value)"
	/>

	<br />

	<input
		type="text"
		placeholder="Barcode"
		:value="searchQuery.barcode.value"
		@input="routeSearchQuery('barcode', ($event.target as HTMLInputElement).value)"
	/>
	<BarcodeScanner @change="onSearchBarcodeChange" />

	<br />

	<label>Quantity</label>
	<select
		:value="searchQuery.quantityComparison.value"
		@change="routeQuantityComparisonSearchQuery(($event.target as HTMLSelectElement).value, quantityInput?.value as number | undefined)"
	>
		<option :value="'disabled'">Disabled</option>
		<option v-for="item in Comparisons" :value="item">{{ item }}</option>
	</select>
	<input
		type="number"
		ref="quantityInput"
		:disabled="searchQuery.quantityComparison.value === 'disabled'"
		:value="searchQuery.quantity.value"
		@input="routeSearchQuery('quantity', ($event.target as HTMLInputElement).value)"
	/>
</template>

<script lang="ts" setup>
import { Comparisons, Ordering, OrderingFieldItem } from '@/graphql/graphql';
import searchQuery, { routeSearchQuery, routeQuantityComparisonSearchQuery } from '@/plugins/searchQuery';
import { Ref, ref } from 'vue';
import BarcodeScanner from './BarcodeScanner.vue';

const quantityInput: Ref<HTMLInputElement | null> = ref(null);

const onSearchBarcodeChange = (val: string | undefined) => {
	if (val) routeSearchQuery('barcode', val)
	else alert('Can\'t read barcode, try again')
}

</script>
