<template>
	<h1>Home</h1>
	<h2>Hello {{ pseudo }}</h2>
	<CollectionsList />
</template>

<script setup lang="ts">

import { useMeQuery } from '@/graphql/graphql';
import CollectionsList from '@/components/CollectionsList.vue';
import { setJwt } from '@/graphql/client';

const logout = () => {
	setJwt()
}

const me = await useMeQuery()
if (me.error.value) logout()

const pseudo = me.data.value?.me?.pseudo


</script>
