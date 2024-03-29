<template>
	<v-app-bar app>
		<v-app-bar-nav-icon v-if="display.mobile.value" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
		<v-app-bar-title tag="div">CollecHandler</v-app-bar-title>
	</v-app-bar>

	<v-navigation-drawer app :permanent="!display.mobile.value" :temporary="display.mobile.value" v-model="drawer">
		<template #prepend>
			<v-list nav>
				<v-list-item>
					<v-list-item-avatar start>
						<v-avatar color="blue">{{ firstLetter }}</v-avatar>
					</v-list-item-avatar>
					<v-list-item-title>{{ pseudo }}</v-list-item-title>
				</v-list-item>
			</v-list>
			<v-divider></v-divider>
		</template>

		<v-list nav density="comfortable">
			<template v-for="item in items">
				<v-list-item :to="{ name: item.route }" :prepend-icon="item.icon" :title="item.text" />
				<v-divider v-if="item.dividerBelow" class="ma-2" />
			</template>
		</v-list>

		<template #append>
			<v-divider />
			<template v-if="typeof version === 'string'">
				<v-list nav density="comfortable">
					<v-list-item :title="'Version: #' + version.substring(0, 6)" />
				</v-list>
				<v-divider />
			</template>

			<v-list nav density="comfortable">
				<v-list-item @click="logout" prepend-icon="mdi-logout" title="Logout" />
			</v-list>
		</template>
	</v-navigation-drawer>

	<v-main>
		<v-container class="px-lg-16 pt-8">
			<slot />
		</v-container>
	</v-main>

	<DebugVuetifyBreakpoint />
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue';
import { useDisplay } from 'vuetify';
import { setJwt } from '@/graphql/client';
import DebugVuetifyBreakpoint from '@/components/DebugVuetifyBreakpoint.vue';
import { useQuery } from '@vue/apollo-composable';
import { MeDocument } from '@/graphql/graphql';

const drawer: Ref<undefined | boolean> = ref(undefined)

const logout = () => {
	setJwt()
}

const display = useDisplay()

const me = useQuery(MeDocument)
me.onError(() => { logout() })

const pseudo = computed(() => me.result.value?.me?.pseudo)
const firstLetter = computed(() => pseudo.value?.charAt(0).toUpperCase())

interface NavbarItem {
	route: string,
	icon: string
	text: string
	dividerBelow?: boolean
}

const items: NavbarItem[] = [
	{ route: 'Home', icon: 'mdi-home', text: 'Home', dividerBelow: true },
	{ route: 'AddItem', icon: 'mdi-plus-circle', text: 'Add item' }
]

const version = computed(() => import.meta.env.VITE_VERSION)

</script>
