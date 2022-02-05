<template>
	<v-card v-if="isDevEnv">
		<v-card-text>{{ display.name }}</v-card-text>
	</v-card>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';

const display = useDisplay()
const isDevEnv = import.meta.env.DEV
</script>

<style scoped>
.v-card {
	position: fixed;
	bottom: 2vh;
	right: 2vh;
}
</style>
