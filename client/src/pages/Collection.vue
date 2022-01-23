<template>
	<h1>{{ name }}</h1>
	<ItemsList :collection-id="collectionId" />
	<h2>Actions</h2>
	<input type="submit" value="Download as CSV" @click.prevent="downloadAs('csv')" />
	<input type="submit" value="Download as JSON" @click.prevent="downloadAs('json')" />
	<br />
	<input type="submit" value="Delete this collection" @click.prevent="deleteCollection" />
</template>

<script setup lang="ts">
import { BareCollectionDocument, BareCollectionQuery, useCollectionIdQuery, useDeleteCollectionMutation } from '@/graphql/graphql';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ItemsList from '@/components/ItemsList.vue';
import { useClientHandle } from '@urql/vue';
import { exportToCsv, exportToJson } from '@/plugins/exportCollections';


if (typeof useRoute().params.id !== "string") throw "Bad parameter"
const collectionId = parseInt(useRoute().params.id as string)

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

</script>
