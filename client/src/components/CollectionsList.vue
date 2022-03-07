<template>
	<h2>My collections</h2>
	<ul>
		<router-link v-for="collection in collections" :to="{ name: 'Collection', params: { id: collection.id } }">
			<li>{{ collection.name }}</li>
		</router-link>
	</ul>
</template>

<script setup lang="ts">
import { Ordering, OrderingFieldCollection, useGetCollectionsQuery } from '@/graphql/graphql';
import { computed } from 'vue';

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

</script>
