<template>
	<h2>My collections</h2>
	<ul>
		<router-link v-for="collection in collections" :to="{ name: 'Collection', params: { id: collection.id } }">
			<li>{{ collection.name }}</li>
		</router-link>
	</ul>
</template>

<script setup lang="ts">
import { useMeQuery } from '@/graphql/graphql';
import { computed } from 'vue';
const me = await useMeQuery()

const collections = computed(() => me.data.value?.me?.collections)

</script>
