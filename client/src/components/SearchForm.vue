<template>
	<v-form>
		<v-row>
			<v-col cols="12">
				<v-text-field v-model="text" label="Text search" hide-details prepend-inner-icon="mdi-alphabetical" />
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
					<option v-for="item in Comparisons" :value="item">{{ quantityComparisonMappings[item] }}</option>
				</select>
			</v-col>
			<v-col cols="8">
				<v-text-field
					v-model="form.quantity"
					:disabled="form.quantityComparison === 'disabled'"
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
import { Comparisons } from '@/graphql/graphql';
import searchQuery, { routeItemSearch } from '@/plugins/searchQuery';
import { reactive, ref, watch } from 'vue';
import { useDebounce } from '@vueuse/core'
import BarcodeScanner from './BarcodeScanner.vue';

const text = ref(searchQuery.text.value)
const form = reactive({
	text: useDebounce(text, 500),
	barcode: searchQuery.barcode.value,
	quantityComparison: searchQuery.quantityComparison.value,
	quantity: searchQuery.quantity.value
})

watch(form, (val) => {
	routeItemSearch(val)
})

const quantityComparisonMappings = {
	[Comparisons.Equals]: "=",
	[Comparisons.Gt]: ">",
	[Comparisons.Gte]: "≥",
	[Comparisons.Lt]: "<",
	[Comparisons.Lte]: "≤",
}

const onBarcodeChange = (barcode?: string) => {
	if (barcode) form.barcode = barcode
	else alert('Can\'t read barcode, please try closer')
}

</script>
