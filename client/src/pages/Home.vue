<template>
	<h1>Home</h1>
	<h2>Hello {{ pseudo }}</h2>
	<CollectionsList />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { MeDocument } from '@/graphql/graphql2';
import CollectionsList from '@/components/CollectionsList.vue';

const me = useQuery(MeDocument)
const pseudo = computed(() => me.result.value?.me?.pseudo)

</script>
