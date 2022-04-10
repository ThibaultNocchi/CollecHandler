<template>
  <v-text-field
    v-model="text"
    clearable
    density="comfortable"
    hide-details
    label="Text search"
    prepend-inner-icon="mdi-alphabetical"
    :single-line="props.singleLine"
    :variant="props.variant"
  />
</template>

<script lang="ts" setup>
import searchQuery, { routeItemTextSearch } from "@/plugins/searchQuery";
import { PropType, ref } from "vue";
import { watchDebounced } from "@vueuse/core";

const props = defineProps({
  variant: {
    type: String as PropType<
      "filled" | "outlined" | "plain" | "contained" | "underlined"
    >,
    default: "filled"
  },
  singleLine: {
    type: Boolean,
    default: false
  }
});

const text = ref(searchQuery.text.value);

watchDebounced(
  text,
  val => {
    routeItemTextSearch(val);
  },
  { debounce: 500 }
);
</script>
