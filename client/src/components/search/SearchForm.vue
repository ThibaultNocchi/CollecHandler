<template>
  <v-col cols="12">
    <h3>Barcode search</h3>
  </v-col>
  <v-col cols="12">
    <v-text-field
      v-model="form.barcode"
      clearable
      density="comfortable"
      hide-details
      label="Barcode"
      prepend-inner-icon="mdi-barcode"
      :variant="props.variant"
    >
      <template #append>
        <BarcodeScanner @change="onBarcodeChange" />
      </template>
    </v-text-field>
  </v-col>

  <v-divider />

  <v-col cols="12">
    <h3>Quantity</h3>
  </v-col>
  <v-col cols="4" align-self="center">
    <select v-model="form.quantityComparison">
      <option :value="'disabled'">Disabled</option>
      <option v-for="item in Comparisons" :value="item">
        {{ quantityComparisonMappings[item] }}
      </option>
    </select>
  </v-col>
  <v-col cols="8">
    <v-text-field
      v-model="form.quantity"
      :disabled="form.quantityComparison === 'disabled'"
      density="comfortable"
      label="Number"
      type="number"
      hide-details
      prepend-inner-icon="mdi-numeric"
    />
  </v-col>
</template>

<script lang="ts" setup>
import { Comparisons } from "@/graphql/graphql";
import searchQuery, { routeItemSearch } from "@/plugins/searchQuery";
import { PropType, reactive, watch } from "vue";
import BarcodeScanner from "@/components/BarcodeScanner.vue";

const props = defineProps({
  variant: {
    type: String as PropType<
      "filled" | "outlined" | "plain" | "contained" | "underlined"
    >,
    default: "filled"
  }
});

const form = reactive({
  barcode: searchQuery.barcode.value,
  quantityComparison: searchQuery.quantityComparison.value,
  quantity: searchQuery.quantity.value
});

watch(form, val => {
  routeItemSearch(val);
});

const quantityComparisonMappings = {
  [Comparisons.Equals]: "=",
  [Comparisons.Gt]: ">",
  [Comparisons.Gte]: "≥",
  [Comparisons.Lt]: "<",
  [Comparisons.Lte]: "≤"
};

const onBarcodeChange = (barcode?: string) => {
  if (barcode) form.barcode = barcode;
  else alert("Can't read barcode, please try closer");
};
</script>
