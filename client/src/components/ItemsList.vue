<template>
  <h2>Items</h2>
  <div class="text-subtitle-1">{{ currentTotalItems }} item(s)</div>
  <template v-if="items.length != 0">
    <v-table>
      <thead>
        <tr>
          <template v-for="field in tableFields">
            <th
              v-if="field.displayCondition.value"
              class="text-left"
              :class="{ pointer: field.orderingField }"
              @click="
                field.orderingField
                  ? switchOrdering(field.orderingField)
                  : undefined
              "
            >
              {{ field.title
              }}{{
                field.orderingField
                  ? getOrderingArrow(field.orderingField)
                  : undefined
              }}
            </th>
          </template>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.name">
          <template v-for="field in tableFields">
            <td v-if="field.displayCondition.value">
              {{
                // @ts-expect-error TS don't like adressing objects with string variables
                item[field.objectKey]
              }}
            </td>
          </template>
          <td class="text-center">
            <v-btn
              @click.stop="routeItem(item.id)"
              icon="mdi-magnify"
              color="primary"
              variant="text"
            />
            <v-btn
              v-if="display.smAndUp.value"
              @click.stop="onDelete(item.id)"
              color="error"
              icon="mdi-delete"
              variant="text"
            />
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-pagination v-model="pagination" :length="pages" />
  </template>
  <div v-else class="my-4">
    <div class="text-center">
      <v-icon color="warning" size="x-large">mdi-magnify-close</v-icon>
    </div>
    <div class="text-subtitle-1 text-center">No item found</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, Ref, watch } from "vue";
import searchQueryStore, {
  currentTotalItems,
  routeItemOrdering
} from "@/plugins/searchQuery";
import { useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import { useMutation, useQuery } from "@vue/apollo-composable";
import {
  DeleteItemDocument,
  Item,
  Ordering,
  OrderingFieldItem,
  SearchItemsDocument
} from "@/graphql/graphql";

const props = defineProps({
  collectionId: {
    type: Number,
    required: false
  }
});

const display = useDisplay();

interface TABLE_FIELD {
  orderingField?: OrderingFieldItem;
  title: string;
  objectKey: string;
  displayCondition: Ref<boolean>;
}

const tableFields: TABLE_FIELD[] = [
  {
    orderingField: OrderingFieldItem.Id,
    title: "#",
    objectKey: "id",
    displayCondition: ref(true)
  },
  {
    orderingField: OrderingFieldItem.Name,
    title: "Name",
    objectKey: "name",
    displayCondition: ref(true)
  },
  {
    orderingField: OrderingFieldItem.Quantity,
    title: "Quantity",
    objectKey: "quantity",
    displayCondition: display.smAndUp
  }
];

// @ts-expect-error it doesn't like the function typing
const searchQuery = useQuery(SearchItemsDocument, () => ({
  input: {
    collectionId: props.collectionId,
    text: searchQueryStore.text.value,
    barcode: searchQueryStore.barcode.value,
    quantity:
      searchQueryStore.quantityComparison.value !== "disabled"
        ? {
            value: searchQueryStore.quantity.value || 0,
            comparison: searchQueryStore.quantityComparison.value
          }
        : undefined
  },
  ordering: {
    page: searchQueryStore.page.value,
    numberPerPage: 10,
    ordering: searchQueryStore.ordering.value,
    orderingFieldItem: searchQueryStore.orderingFieldItem.value
  }
}));

const items: Ref<Item[]> = ref([]);
const pages = ref(1);

searchQuery.onResult(res => {
  if (!res.data) return;
  if (pagination.value != 1 && res.data.search.pages < pagination.value) {
    pagination.value = 1;
    return;
  }
  items.value = res.data.search.items;
  pages.value = res.data.search.pages;
  currentTotalItems.value = res.data.search.total;
});

const router = useRouter();
const route = useRoute();

const pagination = ref(searchQueryStore.page.value);
watch(pagination, (newPage: number) => {
  router.replace({
    ...route,
    query: { ...route.query, page: newPage !== 1 ? newPage : undefined }
  });
});

const routeItem = (itemId: number) => {
  router.push({
    name: "Item",
    params: { collectionId: props.collectionId, id: itemId }
  });
};

const downArrow = "↓";
const upArrow = "↑";

const getOrderingArrow = computed(() => (field: OrderingFieldItem) => {
  if (searchQueryStore.orderingFieldItem.value === field) {
    if (searchQueryStore.ordering.value === Ordering.Asc) return upArrow;
    else return downArrow;
  }
});

const switchOrdering = (field: OrderingFieldItem) => {
  let newOrdering: undefined | Ordering = undefined;
  if (searchQueryStore.orderingFieldItem.value === field) {
    newOrdering =
      searchQueryStore.ordering.value === Ordering.Asc
        ? Ordering.Desc
        : Ordering.Asc;
  }
  routeItemOrdering({ ordering: newOrdering, orderingFieldItem: field });
};

const deleteItem = useMutation(DeleteItemDocument);
deleteItem.onError(() => {
  alert("Delete failed");
});
const onDelete = async (itemId: number) => {
  const res = await confirm("Are you sure you want to delete this item?");
  if (res) deleteItem.mutate({ id: itemId });
};
</script>
