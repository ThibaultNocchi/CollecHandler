<template>
	<h1>{{ name }}</h1>
	<ItemsList :collection-id="collectionId" />

	<h2>Actions</h2>

	<h3>Add new item</h3>
	<form @submit.prevent="onSubmit">
		<input type="text" placeholder="Name" v-model="form.name" />
		<br />
		<input type="number" min="0" placeholder="Quantity" v-model="form.quantity" />
		<br />
		<input type="text" placeholder="Barcode" v-model="form.barcode" />
		<BarcodeScanner @change="onNewItemBarcodeChange" />
		<br />
		<textarea placeholder="Description" v-model="form.description"></textarea>
		<br />
		<input type="submit" value="Add" />
	</form>

	<input type="submit" value="Download as CSV" @click.prevent="downloadAs('csv')" />
	<input type="submit" value="Download as JSON" @click.prevent="downloadAs('json')" />
	<br />
	<input type="submit" value="Delete this collection" @click.prevent="deleteCollection" />
</template>

<script setup lang="ts">
import { BareCollectionDocument, BareCollectionQuery, useAddItemMutation, useCollectionIdQuery, useDeleteCollectionMutation } from '@/graphql/graphql';
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import ItemsList from '@/components/ItemsList.vue';
import BarcodeScanner from '@/components/BarcodeScanner.vue';
import { useClientHandle } from '@urql/vue';
import { exportToCsv, exportToJson } from '@/plugins/exportCollections';
import searchQuery from '@/plugins/searchQuery';


const collectionId = searchQuery.collectionId.value
if (!collectionId) throw "Bad parameter"

const res = await useCollectionIdQuery({ variables: { id: collectionId } })
const deleteCollectionMutation = useDeleteCollectionMutation()
const urqlClient = useClientHandle().client

const name = computed(() => res.data.value?.me?.collection?.name || '')

const router = useRouter()

const downloadAs = async (type: string) => {
	const allItems: BareCollectionQuery = (await urqlClient.query(BareCollectionDocument, { collectionId }).toPromise()).data
	if (type === 'csv') exportToCsv(name.value, allItems)
	else if (type === 'json') exportToJson(name.value, allItems)
}

const deleteCollection = async () => {
	const res = await confirm("Are you sure you want to delete this collection and its items?")
	if (res) {
		const mutRes = await deleteCollectionMutation.executeMutation({ id: collectionId })
		if (mutRes.data?.deleteCollection?.id) router.push({ name: 'Home' })
		else alert("deletion failed")
	}
}

const form = reactive({
	name: '',
	quantity: 1,
	barcode: '',
	description: ''
})
const addItem = useAddItemMutation()


const onSubmit = async () => {
	const addItemMutation = await addItem.executeMutation({
		collectionId: collectionId, input: {
			name: form.name,
			quantity: form.quantity,
			barcode: form.barcode || undefined,
			description: form.description || undefined
		}
	}, { additionalTypenames: ['Collection'] })
	if (addItemMutation.data?.addItem?.id)
		router.push({ name: 'Item', params: { collectionId: collectionId, id: addItemMutation.data.addItem.id } })
	else
		alert('error adding item')
}

const onNewItemBarcodeChange = (val: string | undefined) => {
	if (val) form.barcode = val
	else alert('Can\'t read barcode, try again')
}

</script>
