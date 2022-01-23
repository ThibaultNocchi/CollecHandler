<template>
  <Suspense>
    <v-app>
      <v-app-bar app>
        <v-app-bar-nav-icon v-if="isLoggedIn()" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>CollecHandler</v-app-bar-title>
      </v-app-bar>

      <v-navigation-drawer app temporary v-model="drawer">
        <template #prepend>
          <v-list>
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

        <v-list>
          <v-list-item link @click="router.push({ name: 'Home' })">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <template #append>
          <v-divider></v-divider>
          <v-list>
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
        <router-view />
      </v-main>
    </v-app>
  </Suspense>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { isLoggedIn, setJwt } from './graphql/client';
import { useMeQuery } from './graphql/graphql';

const drawer = ref(false)

const logout = () => {
  drawer.value = false
  setJwt()
}

const router = useRouter()

const me = useMeQuery()

const pseudo = computed(() => me.data.value?.me?.pseudo)
const firstLetter = computed(() => pseudo.value?.charAt(0))
</script>
