<template>
  <Suspense>
    <v-app v-if="isLoggedIn()">
      <v-app-bar app>
        <v-app-bar-nav-icon v-if="display.mobile.value" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>CollecHandler</v-app-bar-title>
      </v-app-bar>

      <v-navigation-drawer
        v-if="isLoggedIn()"
        app
        :permanent="!display.mobile.value"
        :temporary="display.mobile.value"
        v-model="drawer"
      >
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
          <v-list-item link @click="router.push({ name: 'Home' }); drawer = false">
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
          <v-list nav dense>
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
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-app>

    <v-app v-else>
      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </Suspense>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import { isLoggedIn, setJwt } from './graphql/client';
import { useMeQuery } from './graphql/graphql';

const drawer: Ref<null | boolean> = ref(null)

const logout = () => {
  setJwt()
}

const router = useRouter()
const display = useDisplay()

const me = useMeQuery()

const pseudo = computed(() => me.data.value?.me?.pseudo)
const firstLetter = computed(() => pseudo.value?.charAt(0).toUpperCase())

</script>
