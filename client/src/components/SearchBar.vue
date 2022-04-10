<template>
	<v-card v-if="isBig">
		<v-card-header>
			<v-card-header-text>
				<v-card-title>Search</v-card-title>
			</v-card-header-text>
		</v-card-header>
		<v-card-text>
			<SearchForm />
		</v-card-text>
	</v-card>
	<template v-else>
		<SearchForm is-mobile />
		</template>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import SearchForm from './SearchForm.vue';

const display = useDisplay()
const isBig = computed(() => display.mdAndUp.value)
</script>
