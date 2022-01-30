import { Comparisons, Ordering } from "@/graphql/graphql";
import router from "@/routes";
import { computed } from "vue";

const getQueryParamOrUndefined = (key: string) =>
  typeof router.currentRoute.value.query[key] === "string"
    ? (router.currentRoute.value.query[key] as string)
    : undefined;

export const ORDERING_FIELDS = ["id", "name"];

const searchQuery = {
  page: computed(() => parseInt(getQueryParamOrUndefined("page") || "1")),
  ordering: computed(
    () => (getQueryParamOrUndefined("ordering") as Ordering) || Ordering.Desc
  ),
  orderingField: computed(
    () => getQueryParamOrUndefined("orderingField") || "id"
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
  text: computed(() => getQueryParamOrUndefined("text") || ""),
  barcode: computed(() => getQueryParamOrUndefined("barcode")),
  quantityComparison: computed(
    () =>
      ((getQueryParamOrUndefined("quantityComparison") as Comparisons) ||
        "disabled") as Comparisons | string
  ),
  quantity: computed(() =>
    parseInt(getQueryParamOrUndefined("quantity") || "1")
  )
};

export const routeSearchQuery = (name: string, value: string | undefined) => {
  router.push({
    ...router.currentRoute.value,
    query: {
      ...router.currentRoute.value.query,
      [name]: value ? value : undefined
    }
  });
};

export const routeQuantityComparisonSearchQuery = (
  newValue: Comparisons | string,
  quantity: number | undefined
) => {
  if (newValue !== "disabled")
    router.push({
      ...router.currentRoute.value,
      query: {
        ...router.currentRoute.value.query,
        quantityComparison: newValue,
        quantity
      }
    });
  else
    router.push({
      ...router.currentRoute.value,
      query: {
        ...router.currentRoute.value.query,
        quantityComparison: undefined,
        quantity: undefined
      }
    });
};

export default searchQuery;
