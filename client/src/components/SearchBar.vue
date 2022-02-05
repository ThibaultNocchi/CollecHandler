<template>
	<v-card>
		<v-card-header>
			<v-card-header-text>
				<v-card-title>Search</v-card-title>
			</v-card-header-text>
		</v-card-header>
		<v-card-text>
			<SearchForm />
		</v-card-text>
	</v-card>
</template>

<script lang="ts" setup>
import SearchForm from './SearchForm.vue';
</script>
