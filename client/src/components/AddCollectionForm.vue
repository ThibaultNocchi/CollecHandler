<template>
	<v-form :disabled="addCollection.loading.value" @submit.prevent="onSubmit">
		<v-row>
			<v-col cols="12" sm="auto">
				<v-select label="Collection type" v-model="collectionType" :items="collectionTypes" clearable no-data-text="Other" />
			</v-col>
			<v-col>
				<v-text-field
					v-model="value"
					:error-messages="error"
					:loading="addCollection.loading.value"
					label="New collection name"
				>
					<template #append>
						<v-icon type="submit" color="primary" class="pointer" @click="onSubmit">mdi-plus-circle</v-icon>
					</template>
				</v-text-field>
			</v-col>
		</v-row>
	</v-form>
</template>

<script lang="ts" setup>
import { AddCollectionDocument, CollectionType } from '@/graphql/graphql';
import { useMutation } from '@vue/apollo-composable';
import { computed, Ref, ref } from 'vue';

const collectionTypes = computed(() => Object.values(CollectionType))

const addCollection = useMutation(AddCollectionDocument)
addCollection.onDone(res => {
	if (!res.data?.addCollection?.id) throw "Unexpected error"
	value.value = ''
	emit('change', res.data.addCollection.id)
})
addCollection.onError(err => {
	console.error(err)
	onError("Got a server error, please retry")
})

const value = ref('')
const collectionType: Ref<undefined | CollectionType> = ref(undefined)
const error: Ref<string | undefined> = ref(undefined)

const emit = defineEmits(['change'])

const onError = (msg: string) => {
	error.value = msg
}

const onSubmit = async () => {
	error.value = undefined
	if (!value.value) {
		onError("Please fill the new collection name")
		return
	}
	addCollection.mutate({
		input: {
			name: value.value,
			type: collectionType.value
		}
	})
}

</script>
