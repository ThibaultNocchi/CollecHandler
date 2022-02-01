<template>
	<v-icon @click="iconClick">mdi-barcode-scan</v-icon>
	<input class="d-none" ref="file" type="file" @change="onScan" />
</template>

<script lang="ts" setup>
import quagga, { QuaggaJSConfigObject } from '@ericblade/quagga2'
import { Ref, ref, watch } from 'vue';

const file: Ref<null | HTMLInputElement> = ref(null)
const fileBase64: Ref<string | ArrayBuffer | null> = ref(null)

const iconClick = () => {
	if (file.value) file.value.click()
}

const onScan = () => {
	if (!file.value?.files) return

	const reader = new FileReader()
	reader.readAsDataURL(file.value.files[0])
	reader.onload = () => {
		fileBase64.value = reader.result
	}

	file.value.value = ''

}

const emit = defineEmits(['change'])

watch(fileBase64, () => {
	if (!fileBase64.value) return

	const config: QuaggaJSConfigObject = {
		src: fileBase64.value.toString(),
		decoder: {
			readers: ["ean_reader", "ean_8_reader", "code_128_reader", "upc_reader", "upc_e_reader"]
		},
	}

	quagga.decodeSingle(config, (result) => {
		if (result.codeResult) emit('change', result.codeResult.code)
		else emit('change', undefined)
	})
})

</script>

<style scoped>
i {
	cursor: pointer;
}
</style>
