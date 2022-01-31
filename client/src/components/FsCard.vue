<template>
	<v-card class="mb-4">
		<v-card-header>
			<v-card-header-text>
				<v-card-title>
					<slot name="title" />
				</v-card-title>
				<v-card-subtitle>
					<slot name="subtitle" />
				</v-card-subtitle>
			</v-card-header-text>
		</v-card-header>
		<v-card-text>
			<slot />
		</v-card-text>
	</v-card>
	<slot name="append" />
</template>
