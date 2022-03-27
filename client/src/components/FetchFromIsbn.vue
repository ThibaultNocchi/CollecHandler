<template>
	<v-text-field
		v-model="barcodeForm"
		:disabled="loading"
		clearable
		hide-details
		label="Fetch from ISBN"
		prepend-inner-icon="mdi-barcode"
	>
		<template #append>
			<BarcodeScanner v-if="!loading" @change="fetchInfos" />
			<v-progress-circular v-else color="primary" indeterminate />
		</template>
	</v-text-field>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BarcodeScanner from './BarcodeScanner.vue';
import { debouncedWatch } from '@vueuse/core'
import { useApolloClient } from '@vue/apollo-composable';
import { FetchFromIsbnDocument } from '@/graphql/graphql';

const emit = defineEmits(['change'])
const { client } = useApolloClient()

const barcodeForm = ref('')
const loading = ref(false)

debouncedWatch(barcodeForm, async () => {
	fetchInfos(barcodeForm.value)
}, { debounce: 500 })

const fetchInfos = async (barcode: string) => {
	if (barcode !== '') {
		loading.value = true
		const res = (await client.query({ query: FetchFromIsbnDocument, variables: { isbn: barcode } }))
		loading.value = false
		if (!res.data.fetchFromIsbn) {
			alert("No ISBN found")
			return
		}
		emit("change", res.data.fetchFromIsbn)
	}
}

</script>
