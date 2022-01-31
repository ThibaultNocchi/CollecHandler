<template>
  <Suspense>
    <v-app>
      <component :is="layout">
        <router-view />
      </component>
    </v-app>
  </Suspense>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute()
const layout = computed(() => route.meta.layout as string | undefined)

</script>
