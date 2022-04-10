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

			<v-btn :to="{ name: 'AddItem', query: { collectionId: collectionId } }" color="primary" size="small">
				Add new item
			</v-btn>
			<br />
			<v-btn @click="downloadAs('csv')" size="small">Download as CSV</v-btn>
			<v-btn @click="downloadAs('json')" size="small">Download as JSON</v-btn>
			<br />
			<v-btn @click="deleteCollection" color="error" size="small">Delete this collection</v-btn>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import ItemsList from '@/components/ItemsList.vue';
import { exportToCsv, exportToJson } from '@/plugins/exportCollections';
import searchQuery from '@/plugins/searchQuery';
import SearchBar from '@/components/SearchBar.vue';
import { useApolloClient, useMutation } from '@vue/apollo-composable';
import { BareCollectionDocument, DeleteCollectionDocument, GetCollectionDocument } from '@/graphql/graphql';

const collectionId = searchQuery.collectionId.value
if (!collectionId) throw "Bad parameter"

const router = useRouter()
const { client } = useApolloClient()

const res = await client.query({
	query: GetCollectionDocument,
	variables: {
		id: collectionId
	}
})

const deleteCollectionMutation = useMutation(DeleteCollectionDocument)
deleteCollectionMutation.onDone(() => {
	router.push({ name: 'Home' })
})
deleteCollectionMutation.onError(err => {
	alert("deletion failed")
	console.error(err)
})

const name = computed(() => res.data.me?.collection?.name || '')
const collectionType = computed(() => res.data.me?.collection?.type || 'other')

const downloadAs = async (type: string) => {
	const allItems = (await client.query({
		query: BareCollectionDocument,
		variables: { collectionId }
	})).data
	if (type === 'csv') exportToCsv(name.value, allItems)
	else if (type === 'json') exportToJson(name.value, allItems)
}

const deleteCollection = async () => {
	const res = await confirm("Are you sure you want to delete this collection and its items?")
	if (res) deleteCollectionMutation.mutate({ id: collectionId })
}

</script>
