<template>
	<h2>My collections</h2>
	<ul>
		<router-link v-for="collection in collections" :to="{ name: 'Collection', params: { id: collection.id } }">
			<li>{{ collection.name }}</li>
		</router-link>
	</ul>
	<h3>Actions</h3>
	<form @submit.prevent="onAdd">
		<input type="text" placeholder="Collection name" v-model="newCollectioName" />
		<br />
		<input type="submit" value="Create collection" />
	</form>
</template>

<script setup lang="ts">import { useAddCollectionMutation, useMeQuery } from '@/graphql/graphql';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
const me = await useMeQuery()
const addCollection = useAddCollectionMutation()

const collections = computed(() => me.data.value?.me?.collections)
const newCollectioName = ref('')

const router = useRouter()

const onAdd = async () => {
	const res = await addCollection.executeMutation({ input: { name: newCollectioName.value } }, { additionalTypenames: ['User'] })
	if (res.data?.addCollection?.id)
		router.push({ name: "Collection", params: { id: res.data.addCollection.id } })
	else
		alert("error adding collection")
}
</script>
