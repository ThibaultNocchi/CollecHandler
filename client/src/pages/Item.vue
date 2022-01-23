<template>
	<h1>{{ item?.name }}</h1>
	<h2>Description</h2>
	<p v-if="item?.description">{{ item.description }}</p>
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

<script setup lang="ts">import { useDeleteItemMutation, useItemIdQuery } from '@/graphql/graphql';
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import jsbarcode from 'jsbarcode'
import copy from 'copy-to-clipboard'


if (typeof useRoute().params.collectionId !== "string") throw "Bad parameter"
const collectionId = parseInt(useRoute().params.collectionId as string)

if (typeof useRoute().params.id !== "string") throw "Bad parameter"
const itemId = parseInt(useRoute().params.id as string)

const res = await useItemIdQuery({ variables: { collectionId, id: itemId } })
const deleteItem = useDeleteItemMutation()
const item = computed(() => res.data.value?.me?.collection?.item || undefined)

if (!item.value)
	useRouter().replace({ name: 'Collection', params: { id: collectionId } })

const router = useRouter()

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
	if (res) {
		const mutRes = await deleteItem.executeMutation({ id: itemId })
		if (mutRes.data?.deleteItem?.id) router.push({ name: 'Collection', params: { id: collectionId } })
		else alert("deletion failed")
	}
}

</script>

<style scoped>
canvas {
	cursor: pointer;
}
</style>
