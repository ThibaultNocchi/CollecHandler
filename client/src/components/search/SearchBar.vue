<template>
  <v-card v-if="isBig">
    <v-card-header>
      <v-card-header-text>
        <v-card-title>Search</v-card-title>
      </v-card-header-text>
    </v-card-header>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <SearchText variant="filled" />
        </v-col>
        <v-divider />
        <SearchForm variant="filled" />
      </v-row>
    </v-card-text>
  </v-card>

  <template v-else>
    <v-row align="center">
      <v-col>
        <SearchText single-line variant="outlined" />
      </v-col>
      <v-col cols="auto">
        <v-btn variant="text" @click="dialog = true">Filters</v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" fullscreen>
      <v-card>
        <v-toolbar>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>Filters</v-toolbar-title>
          <v-spacer />
          <div>{{ currentTotalItems }} item(s)</div>
        </v-toolbar>

        <v-card class="mt-4 mx-4 mx-sm-16">
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <SearchText variant="filled" />
              </v-col>
              <v-divider />
              <SearchForm variant="filled" />
            </v-row>
          </v-card-text>
        </v-card>
      </v-card>
    </v-dialog>
  </template>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";
import SearchForm from "@/components/search/SearchForm.vue";
import SearchText from "@/components/search/SearchText.vue";
import { currentTotalItems } from "@/plugins/searchQuery";

const display = useDisplay();
const isBig = computed(() => display.mdAndUp.value);

const dialog = ref(false);
</script>
