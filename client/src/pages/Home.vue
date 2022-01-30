<template>
	<h1>Home</h1>
	<h2>Hello {{ pseudo }}</h2>
	<CollectionsList />
</template>

<script setup lang="ts">

import { useMeQuery } from '@/graphql/graphql';
import CollectionsList from '@/components/CollectionsList.vue';
import { computed } from 'vue';

const me = useMeQuery()
const pseudo = computed(() => me.data.value?.me?.pseudo)

</script>
