<template>
	<v-app-bar app>
		<v-app-bar-nav-icon v-if="display.mobile.value" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
		<v-app-bar-title>CollecHandler</v-app-bar-title>
	</v-app-bar>

	<v-navigation-drawer app :permanent="!display.mobile.value" :temporary="display.mobile.value" v-model="drawer">
		<template #prepend>
			<v-list nav dense>
				<v-list-item>
					<v-list-item-avatar>
						<v-avatar color="blue">{{ firstLetter }}</v-avatar>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title>{{ pseudo }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
			<v-divider></v-divider>
		</template>

		<v-list nav dense>
			<template v-for="item in items">
				<v-list-item link @click="router.push({ name: item.route })">
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>{{ item.text }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-divider v-if="item.dividerBelow" class="ma-2" />
			</template>
		</v-list>

		<template #append>
			<v-divider />
			<v-list nav dense>
				<template v-if="typeof version === 'string'">
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title>Version: #{{ version.substring(0, 6) }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-divider class="ma-2" />
				</template>

				<v-list-item link @click="logout">
					<v-list-item-icon>
						<v-icon>mdi-logout</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>Logout</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
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
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import { setJwt } from '../graphql/client';
import { useMeQuery } from '../graphql/graphql';
import DebugVuetifyBreakpoint from '@/components/DebugVuetifyBreakpoint.vue';

const drawer: Ref<undefined | boolean> = ref(undefined)

const logout = () => {
	setJwt()
}

const router = useRouter()
const display = useDisplay()

const me = await useMeQuery()
if (me.error.value) logout()

const pseudo = computed(() => me.data.value?.me?.pseudo)
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
