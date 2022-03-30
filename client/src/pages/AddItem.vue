<template>
	<v-card>
		<v-card-header>
			<v-card-header-text>
				<v-card-title>Add an item</v-card-title>
			</v-card-header-text>
		</v-card-header>
		<v-card-text>
			<v-form :disabled="addItem.loading.value" @submit.prevent="onSubmit">
				<v-row>
					<v-col cols="12" sm="6">
						<label>Collection</label>
						<select v-model="form.collectionId" class="pa-2 pointer">
							<option :value="undefined">New collection</option>
							<option v-for="collection in collections" :value="collection.id">{{ collection.name }}</option>
						</select>
					</v-col>
					<v-col v-if="!form.collectionId" cols="12" sm="6">
						<AddCollectionForm @change="newCollection($event)" />
					</v-col>
					<v-col v-else-if="currentCollection?.type === CollectionType.Books" cols="12" sm="6">
						<FetchFromIsbn @change="fetchFromIsbnEvent" />
					</v-col>
					<v-col cols="12">
						<v-text-field
							v-model="form.name"
							:error="errors.name"
							hide-details
							label="Item name"
							prepend-inner-icon="mdi-alphabetical"
						/>
					</v-col>
					<v-col cols="12" sm="6">
						<v-text-field
							v-model="form.quantity"
							:error="errors.quantity"
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
					<v-col cols="12" class="text-right">
						<v-btn v-if="!addItem.loading.value" type="submit" color="primary" :block="display.smAndDown.value" text>Add</v-btn>
						<v-progress-circular v-else color="primary" indeterminate />
					</v-col>
				</v-row>
			</v-form>
		</v-card-text>
	</v-card>
</template>

<script lang="ts" setup>
import BarcodeScanner from '@/components/BarcodeScanner.vue';
import { Ordering, OrderingFieldCollection, CollectionType, FetchFromIsbnPayload, GetCollectionsDocument, AddItemDocument, Collection } from '@/graphql/graphql';
import { computed, reactive, ref, Ref } from 'vue';
import { useDisplay } from 'vuetify';
import AddCollectionForm from '@/components/AddCollectionForm.vue';
import { useRoute, useRouter } from 'vue-router';
import FetchFromIsbn from '@/components/FetchFromIsbn.vue';
import { useMutation, useQuery } from '@vue/apollo-composable';

const display = useDisplay()
const router = useRouter()
const route = useRoute()

const collections: Ref<Collection[]> = ref([])
const getCollections = useQuery(GetCollectionsDocument, {
	input: {},
	ordering: {
		numberPerPage: -1,
		page: 1,
		ordering: Ordering.Asc,
		orderingFieldCollection: OrderingFieldCollection.Name
	}
})
getCollections.onResult(res => {
	collections.value = res.data.getCollections.collections

	if (typeof route.query.collectionId === "string") {
		const queryId = parseInt(route.query.collectionId)
		if (collections.value.some(el => el.id === queryId)) {
			form.collectionId = queryId
		}
		router.replace({ ...route, query: undefined })
	}
})

const addItem = useMutation(AddItemDocument)
addItem.onDone(() => {
	router.push({ name: 'Collection', params: { id: form.collectionId } })
})
addItem.onError(err => {
	alert('Error adding item, see console')
	console.error(err)
	return
})

const form = reactive({
	collectionId: undefined as number | undefined,
	name: '',
	quantity: 1,
	barcode: '',
	description: ''
})

const currentCollection = computed(() => collections.value?.find(el => el.id === form.collectionId))

const fetchFromIsbnEvent = (event: FetchFromIsbnPayload) => {
	form.name = event.name
	form.barcode = event.isbn
}

const newCollection = async (id: number) => {
	await getCollections.refetch()
	form.collectionId = id
}

const errors = reactive({
	collectionId: false,
	name: false,
	quantity: false
})

const onBarcodeChange = (barcode?: string) => {
	if (barcode) form.barcode = barcode
	else alert('Can\'t read barcode, please try closer')
}

const onSubmit = async () => {
	if (!form.collectionId) {
		errors.collectionId = true
		alert('Please pick a collection')
		return
	}
	errors.collectionId = false

	if (!form.name) {
		errors.name = true
		alert('Please fill the item\'s name')
		return
	}
	errors.name = false

	if (!form.quantity) {
		errors.quantity = true
		alert('Please fill the item\'s quantity')
		return
	}
	errors.quantity = false

	addItem.mutate({
		collectionId: form.collectionId,
		input: {
			name: form.name,
			quantity: form.quantity,
			barcode: form.barcode || undefined,
			description: form.description || undefined
		}
	})

}

</script>
