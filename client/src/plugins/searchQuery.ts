import { Comparisons, Ordering, OrderingFieldItem } from "@/graphql/graphql";
import router from "@/routes";
import { computed } from "vue";

const DEFAULTS = {
  ordering: Ordering.Desc,
  orderingFieldItem: OrderingFieldItem.Id,
  quantityComparison: "disabled" as Comparisons | string,
  quantity: 1
};

const getQueryParamOrUndefined = (key: string) =>
  typeof router.currentRoute.value.query[key] === "string"
    ? (router.currentRoute.value.query[key] as string)
    : undefined;

const searchQuery = {
  page: computed(() => parseInt(getQueryParamOrUndefined("page") || "1")),
  ordering: computed(
    () =>
      (getQueryParamOrUndefined("ordering") as Ordering) || DEFAULTS.ordering
  ),
  orderingFieldItem: computed(
    () =>
      getQueryParamOrUndefined("orderingFieldItem") ||
      DEFAULTS.orderingFieldItem
  ),
  collectionId: computed(() => {
    if (
      router.currentRoute.value.name === "Collection" &&
      typeof router.currentRoute.value.params.id === "string"
    ) {
      return parseInt(router.currentRoute.value.params.id);
    }

    return getQueryParamOrUndefined("collectionId")
      ? // @ts-expect-error return value should be always defined
        parseInt(getQueryParamOrUndefined("collectionId"))
      : undefined;
  }),
  text: computed(() => getQueryParamOrUndefined("text")),
  barcode: computed(() => getQueryParamOrUndefined("barcode")),
  quantityComparison: computed(
    () =>
      ((getQueryParamOrUndefined("quantityComparison") as Comparisons) ||
        DEFAULTS.quantityComparison) as Comparisons | string
  ),
  quantity: computed(() => {
    const res = getQueryParamOrUndefined("quantity");
    return res ? parseInt(res) : DEFAULTS.quantity;
  })
};

export const routeItemSearch = ({
  ordering,
  orderingFieldItem,
  text,
  barcode,
  quantityComparison,
  quantity
}: {
  ordering: Ordering;
  orderingFieldItem: string;
  text?: string;
  barcode?: string;
  quantityComparison: Comparisons | string;
  quantity: number;
}) => {
  const routeQuery = {
    ordering: ordering !== DEFAULTS.ordering ? ordering : undefined,
    orderingFieldItem:
      orderingFieldItem !== DEFAULTS.orderingFieldItem
        ? orderingFieldItem
        : undefined,
    text: text || undefined,
    barcode: barcode || undefined,
    quantityComparison:
      quantityComparison !== DEFAULTS.quantityComparison
        ? quantityComparison
        : undefined,
    quantity:
      quantityComparison !== "disabled"
        ? quantity || DEFAULTS.quantity
        : undefined
  };
  router.push({
    ...router.currentRoute.value,
    query: {
      ...router.currentRoute.value.query,
      ...routeQuery
    }
  });
};

export default searchQuery;
