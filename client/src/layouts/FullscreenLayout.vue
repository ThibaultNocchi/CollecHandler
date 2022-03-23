<template>
	<v-main>
		<v-container class="fsLayout d-flex">
			<v-row align="center" justify="space-around">
				<v-col lg="6" xl="4">
					<v-img class="mx-auto" :src="logo" style="width: 20vw;" />
					<h1 class="text-center mt-4">CollecHandler</h1>
				</v-col>
				<v-col sm="10" lg="6" xl="4" class="text-center">
					<slot />
				</v-col>
			</v-row>
		</v-container>
	</v-main>
</template>

<script lang="ts" setup>
import logo from '../../logo.svg'
</script>

<style scoped>
.fsLayout {
	height: 100vh;
}
</style>
