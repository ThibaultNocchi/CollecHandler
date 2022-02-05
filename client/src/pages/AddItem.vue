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
					<v-col cols="12" sm="6">
						<label>Collection</label>
						<select v-model="form.collectionId" class="pa-2 pointer">
							<option :value="undefined">New collection</option>
							<option v-for="collection in collections" :value="collection.id">{{ collection.name }}</option>
						</select>
					</v-col>
					<v-col v-if="!form.collectionId" cols="12" sm="6">
						<AddCollectionTextField @change="form.collectionId = $event" />
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
						<v-btn color="primary" :block="display.smAndDown.value" text @click="onSubmit">Send</v-btn>
					</v-col>
				</v-row>
			</v-form>
		</v-card-text>
	</v-card>
</template>

<script lang="ts" setup>
import BarcodeScanner from '@/components/BarcodeScanner.vue';
import { Ordering, OrderingFieldCollection, useAddItemMutation, useGetCollectionsQuery } from '@/graphql/graphql';
import { computed, reactive } from 'vue';
import { useDisplay } from 'vuetify';
import AddCollectionTextField from '@/components/AddCollectionTextField.vue';
import { useRoute, useRouter } from 'vue-router';

const display = useDisplay()
const router = useRouter()
const route = useRoute()

const getCollections = await useGetCollectionsQuery({
	variables: {
		input: {},
		ordering: {
			numberPerPage: -1,
			page: 1,
			ordering: Ordering.Asc,
			orderingFieldCollection: OrderingFieldCollection.Name
		}
	}
})
const collections = computed(() => getCollections.data.value?.getCollections.collections)

const addItem = useAddItemMutation()

const form = reactive({
	collectionId: undefined as number | undefined,
	name: '',
	quantity: 1,
	barcode: '',
	description: ''
})

const errors = reactive({
	collectionId: false,
	name: false,
	quantity: false
})

if (typeof route.query.collectionId === "string") {
	const queryId = parseInt(route.query.collectionId)
	if (getCollections.data.value?.getCollections.collections.some(el => el.id === queryId)) {
		form.collectionId = queryId
		router.replace({ ...route, query: undefined })
	}
}

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

	const res = await addItem.executeMutation({
		collectionId: form.collectionId,
		input: {
			name: form.name,
			quantity: form.quantity,
			barcode: form.barcode || undefined,
			description: form.description || undefined
		}
	})

	if (res.error || !res.data?.addItem?.id) {
		alert('Error adding item, see console')
		console.error(res.error)
		return
	}

	const itemId = res.data.addItem.id
	router.push({ name: 'Item', params: { collectionId: form.collectionId, id: itemId } })

}

</script>
