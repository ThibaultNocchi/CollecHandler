<template>
	<h2>My collections</h2>
	<ul>
		<router-link v-for="collection in collections" :to="{ name: 'Collection', params: { id: collection.id } }">
			<li>{{ collection.name }}</li>
		</router-link>
	</ul>
</template>

<script setup lang="ts">
import { GetCollectionsDocument, Ordering, OrderingFieldCollection } from '@/graphql/graphql';
import { useQuery } from '@vue/apollo-composable';
import { computed } from 'vue';

const getCollections = useQuery(GetCollectionsDocument, {
	input: {},
	ordering: {
		numberPerPage: -1,
		page: 1,
		ordering: Ordering.Asc,
		orderingFieldCollection: OrderingFieldCollection.Name
	}
})

const collections = computed(() => getCollections.result.value?.getCollections.collections)

</script>
