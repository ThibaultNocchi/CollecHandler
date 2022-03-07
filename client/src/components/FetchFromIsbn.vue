<template>
	<v-text-field v-model="barcodeForm" clearable hide-details label="Fetch from ISBN" prepend-inner-icon="mdi-barcode">
		<template #append>
			<BarcodeScanner @change="fetchInfos" />
		</template>
	</v-text-field>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BarcodeScanner from './BarcodeScanner.vue';
import { useFetchFromIsbnQuery } from '@/graphql/graphql'
import { debouncedWatch } from '@vueuse/core'

const emit = defineEmits(['change'])

const barcodeParameter = ref('')
// @ts-expect-error - Vue URQL handles reactive values
const fetchFromIsbnQuery = useFetchFromIsbnQuery({ variables: { isbn: barcodeParameter }, pause: true, requestPolicy: 'network-only' })

const barcodeForm = ref('')
debouncedWatch(barcodeForm, async () => {
	fetchInfos(barcodeForm.value)
}, { debounce: 500 })

const fetchInfos = async (barcode: string) => {
	if (barcode !== '') {
		barcodeParameter.value = barcode
		const res = (await fetchFromIsbnQuery.executeQuery()).data?.value?.fetchFromIsbn
		emit("change", res)
	}
}

</script>
