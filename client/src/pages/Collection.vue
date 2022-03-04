<template>
	<h1>{{ name }}</h1>
	<div class="text-subtitle-1">{{ collectionType }}</div>
	<v-row class="mt-2">
		<v-col cols="12" md="4" lg="3">
			<SearchBar />
		</v-col>
		<v-col>
			<ItemsList :collection-id="collectionId" />
			<h2>Actions</h2>

			<router-link :to="{ name: 'AddItem', query: { collectionId } }">Add new item</router-link>
			<br />
			<input type="submit" value="Download as CSV" @click.prevent="downloadAs('csv')" />
			<input type="submit" value="Download as JSON" @click.prevent="downloadAs('json')" />
			<br />
			<input type="submit" value="Delete this collection" @click.prevent="deleteCollection" />
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import { BareCollectionDocument, BareCollectionQuery, useGetCollectionQuery, useDeleteCollectionMutation } from '@/graphql/graphql';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import ItemsList from '@/components/ItemsList.vue';
import { useClientHandle } from '@urql/vue';
import { exportToCsv, exportToJson } from '@/plugins/exportCollections';
import searchQuery from '@/plugins/searchQuery';
import SearchBar from '@/components/SearchBar.vue';


const collectionId = searchQuery.collectionId.value
if (!collectionId) throw "Bad parameter"

const res = await useGetCollectionQuery({ variables: { id: collectionId } })
const deleteCollectionMutation = useDeleteCollectionMutation()
const urqlClient = useClientHandle().client

const name = computed(() => res.data.value?.me?.collection?.name || '')
const collectionType = computed(() => res.data.value?.me?.collection?.type || 'other')

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
