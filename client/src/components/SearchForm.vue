<template>
	<v-form>
		<v-row>
			<v-col cols="12">
				<h3>Ordering</h3>
			</v-col>
			<v-col cols="4">
				<select
					:value="searchQuery.ordering.value"
					@change="routeSearchQuery('ordering', ($event.target as HTMLSelectElement).value)"
				>
					<option v-for="item in Ordering" :value="item">{{ item }}</option>
				</select>
			</v-col>
			<v-col cols="8">
				<select
					:value="searchQuery.orderingFieldItem.value"
					@change="routeSearchQuery('orderingFieldItem', ($event.target as HTMLSelectElement).value)"
				>
					<option v-for="item in OrderingFieldItem" :value="item">{{ item }}</option>
				</select>
			</v-col>

			<v-divider />

			<v-col cols="12">
				<v-text-field
					:value="searchQuery.text.value"
					@input="routeSearchQuery('text', ($event.target as HTMLInputElement).value)"
					label="Text search"
					hide-details
					prepend-inner-icon="mdi-alphabetical"
				/>
			</v-col>

			<v-divider />

			<v-col cols="12">
				<v-text-field
					:value="searchQuery.barcode.value"
					@input="routeSearchQuery('barcode', ($event.target as HTMLInputElement).value)"
					clearable
					hide-details
					label="Barcode"
					prepend-inner-icon="mdi-barcode"
				>
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
				<select
					:value="searchQuery.quantityComparison.value"
					@change="routeQuantityComparisonSearchQuery(($event.target as HTMLSelectElement).value, quantityInput?.value as number | undefined)"
				>
					<option :value="'disabled'">Disabled</option>
					<option v-for="item in Comparisons" :value="item">{{ item }}</option>
				</select>
			</v-col>
			<v-col cols="8">
				<v-text-field
					:value="searchQuery.quantity.value"
					@input="routeSearchQuery('quantity', ($event.target as HTMLInputElement).value)"
					ref="quantityInput"
					label="Number"
					type="number"
					hide-details
					prepend-inner-icon="mdi-numeric"
				/>
			</v-col>
		</v-row>
	</v-form>
</template>

<script lang="ts" setup>
import { Comparisons, Ordering, OrderingFieldItem } from '@/graphql/graphql';
import searchQuery, { routeSearchQuery, routeQuantityComparisonSearchQuery } from '@/plugins/searchQuery';
import { Ref, ref } from 'vue';
import BarcodeScanner from './BarcodeScanner.vue';

const quantityInput: Ref<HTMLInputElement | null> = ref(null);

const onBarcodeChange = (barcode?: string) => {
	if (barcode) routeSearchQuery('barcode', barcode)
	else alert('Can\'t read barcode, please try closer')
}

</script>
