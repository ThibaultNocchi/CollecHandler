<template>
	<v-text-field
		v-model="value"
		:error-messages="props.errorMessages"
		:hide-details="props.hideDetails"
		:label="props.label"
		prepend-inner-icon="mdi-key"
		:type="showPassword ? 'text' : 'password'"
	>
		<template #append class="pointer">
			<v-icon @click="showPassword = !showPassword" class="pointer">{{ showPassword ? "mdi-eye" : "mdi-eye-off" }}</v-icon>
		</template>
	</v-text-field>
</template>

<script lang="ts" setup>
import { PropType, ref, watch } from 'vue';

const props = defineProps({
	errorMessages: [Array, String] as PropType<string | string[]>,
	hideDetails: {
		type: [Boolean, String] as PropType<boolean | "auto">,
		default: "auto"
	},
	label: String,
	value: String,
})

const emit = defineEmits(['input'])

const value = ref(props.value)
const showPassword = ref(false)

watch(value, () => {
	emit('input', value.value)
})

</script>
