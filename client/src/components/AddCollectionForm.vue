<template>
	<v-row>
		<v-col cols="6">
			<label>Collection type</label>
			<select v-model="collectionType" class="pa-2 pointer">
				<option :value="undefined">Other</option>
				<option v-for="collectionType in CollectionType" :value="collectionType">{{ collectionType }}</option>
			</select>
		</v-col>
		<v-col cols="6">
			<v-text-field v-model="value" :error="error" label="New collection name" hide-details>
				<template #append>
					<v-icon class="pointer" @click="onSubmit">mdi-plus-circle</v-icon>
				</template>
			</v-text-field>
		</v-col>
	</v-row>
</template>

<script lang="ts" setup>
import { useAddCollectionMutation, CollectionType } from '@/graphql/graphql';
import { Ref, ref } from 'vue';

const addCollection = useAddCollectionMutation()

const value = ref('')
const collectionType: Ref<undefined | CollectionType> = ref(undefined)
const error = ref(false)

const emit = defineEmits(['change'])

const onError = (msg: string) => {
	error.value = true
	alert(msg)
}

const onSubmit = async () => {
	if (!value.value) {
		onError("Please fill the new collection name")
		return
	}
	error.value = false
	const res = await addCollection.executeMutation({ input: { name: value.value, type: collectionType.value } }, { additionalTypenames: ['User'] })
	if (res.error || !res.data?.addCollection?.id) {
		onError("Got a server error, please retry")
		return
	}
	const id = res.data.addCollection.id
	value.value = ''
	emit('change', id)
}

</script>
