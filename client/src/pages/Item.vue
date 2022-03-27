<template>
	<h1>{{ item?.name }}</h1>
	<h2>Description</h2>
	<p>
		<template v-if="item?.description">{{ item.description }}</template>
		<template v-else>No description</template>
	</p>
	<h2>Infos</h2>
	<ul>
		<li>Quantity: {{ item?.quantity }}</li>
	</ul>
	<template v-if="item?.barcode">
		<h2>Barcode</h2>
		<canvas @click="copyBarcode" id="barcode" />
		<p>
			<small>Click barcode to copy value</small>
		</p>
	</template>
	<h2>Action</h2>
	<input type="submit" @click.prevent="onDelete" value="Delete item" />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import jsbarcode from 'jsbarcode'
import copy from 'copy-to-clipboard'
import { useApolloClient, useMutation } from '@vue/apollo-composable';
import { DeleteItemDocument, GetItemDocument } from '@/graphql/graphql2';

if (typeof useRoute().params.collectionId !== "string") throw "Bad parameter"
const collectionId = parseInt(useRoute().params.collectionId as string)

if (typeof useRoute().params.id !== "string") throw "Bad parameter"
const itemId = parseInt(useRoute().params.id as string)

const { client } = useApolloClient()
const router = useRouter()

const res = await client.query({ query: GetItemDocument, variables: { collectionId, id: itemId } })
const item = computed(() => res.data.me?.collection?.item || undefined)

const deleteItem = useMutation(DeleteItemDocument)
deleteItem.onDone(() => {
	router.push({ name: 'Collection', params: { id: collectionId } })
})
deleteItem.onError(err => {
	console.error(err)
	alert("deletion failed")
})

if (!item.value)
	router.replace({ name: 'Collection', params: { id: collectionId } })

onMounted(() => {
	if (item.value?.barcode)
		jsbarcode('#barcode', item.value.barcode)
})

const copyBarcode = () => {
	if (item.value?.barcode) {
		copy(item.value?.barcode)
		alert('Barcode copied!')
	}
}

const onDelete = async () => {
	const res = await confirm("Are you sure you want to delete this item?")
	if (res) deleteItem.mutate({ id: itemId })
}

</script>

<style scoped>
canvas {
	cursor: pointer;
}
</style>
