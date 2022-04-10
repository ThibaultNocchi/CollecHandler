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
import { PropType, ref, watch } from "vue";
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
const paused = ref(false);

watchDebounced(
  text,
  val => {
    if (!paused.value) routeItemTextSearch(val);
    paused.value = false;
  },
  { debounce: 500 }
);

// Serves to update this component instance if value is changed somewhere else
watch(searchQuery.text, val => {
  if (val !== text.value) {
    paused.value = true;
    text.value = val;
  }
});
</script>
