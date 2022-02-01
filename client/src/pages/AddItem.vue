<template>
	<v-card>
		<v-card-header>
			<v-card-header-text>
				<v-card-title>Add an item</v-card-title>
			</v-card-header-text>
		</v-card-header>
		<v-card-text>
			<v-form>
				<v-row>
					<v-col cols="12">
						<v-text-field v-model="form.name" hide-details label="Item name" prepend-inner-icon="mdi-alphabetical" />
					</v-col>
					<v-col cols="12" sm="6">
						<v-text-field
							v-model="form.quantity"
							type="number"
							hide-details
							label="Quantity"
							prepend-inner-icon="mdi-numeric"
						/>
					</v-col>
					<v-col cols="12" sm="6">
						<v-text-field v-model="form.barcode" clearable hide-details label="Barcode" prepend-inner-icon="mdi-barcode">
							<template #append>
								<BarcodeScanner @change="onBarcodeChange" />
							</template>
						</v-text-field>
					</v-col>
					<v-col cols="12">
						<v-textarea v-model="form.description" hide-details auto-grow label="Description" />
					</v-col>
				</v-row>
			</v-form>
		</v-card-text>
	</v-card>
</template>

<script lang="ts" setup>
import BarcodeScanner from '@/components/BarcodeScanner.vue';
import { reactive } from 'vue';

const form = reactive({
	name: '',
	quantity: 1,
	barcode: '',
	description: ''
})

const onBarcodeChange = (barcode?: string) => {
	if (barcode) form.barcode = barcode
	else alert('Can\'t read barcode, please try closer')
}

</script>
