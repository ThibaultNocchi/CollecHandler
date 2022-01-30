<template>
  <Suspense>
    <v-app>
      <Default v-if="isLoggedIn()" />
      <Fullscreen v-else />
    </v-app>
  </Suspense>
</template>

<script lang="ts" setup>
import Default from './layouts/Default.vue';
import Fullscreen from './layouts/Fullscreen.vue';
import { isLoggedIn } from './graphql/client'

</script>
