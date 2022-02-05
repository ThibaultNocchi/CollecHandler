<template>
	<v-form>
		<v-row>
			<v-col cols="12">
				<h3>Ordering</h3>
			</v-col>
			<v-col cols="4">
				<select v-model="form.ordering">
					<option v-for="item in Ordering" :value="item">{{ item }}</option>
				</select>
			</v-col>
			<v-col cols="8">
				<select v-model="form.orderingFieldItem">
					<option v-for="item in OrderingFieldItem" :value="item">{{ item }}</option>
				</select>
			</v-col>

			<v-divider />

			<v-col cols="12">
				<v-text-field v-model="form.text" label="Text search" hide-details prepend-inner-icon="mdi-alphabetical" />
			</v-col>

			<v-divider />

			<v-col cols="12">
				<v-text-field v-model="form.barcode" clearable hide-details label="Barcode" prepend-inner-icon="mdi-barcode">
					<template #append>
						<BarcodeScanner @change="onBarcodeChange" />
					</template>
				</v-text-field>
			</v-col>

			<v-divider />

			<v-col cols="12">
				<h3>Quantity</h3>
			</v-col>
			<v-col cols="4" align-self="center">
				<select v-model="form.quantityComparison">
					<option :value="'disabled'">Disabled</option>
					<option v-for="item in Comparisons" :value="item">{{ item }}</option>
				</select>
			</v-col>
			<v-col cols="8">
				<v-text-field v-model="form.quantity" label="Number" type="number" hide-details prepend-inner-icon="mdi-numeric" />
			</v-col>
		</v-row>
	</v-form>
</template>

<script lang="ts" setup>
import { Comparisons, Ordering, OrderingFieldItem } from '@/graphql/graphql';
import searchQuery, { routeItemSearch } from '@/plugins/searchQuery';
import { reactive, watch } from 'vue';
import BarcodeScanner from './BarcodeScanner.vue';

const form = reactive({
	ordering: searchQuery.ordering.value,
	orderingFieldItem: searchQuery.orderingFieldItem.value,
	text: searchQuery.text.value,
	barcode: searchQuery.barcode.value,
	quantityComparison: searchQuery.quantityComparison.value,
	quantity: searchQuery.quantity.value
})

watch(form, (val) => {
	routeItemSearch(val)
})

const onBarcodeChange = (barcode?: string) => {
	if (barcode) form.barcode = barcode
	else alert('Can\'t read barcode, please try closer')
}

</script>
