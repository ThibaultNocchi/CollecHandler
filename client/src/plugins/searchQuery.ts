import { Comparisons, Ordering } from "@/graphql/graphql";
import router from "@/routes";
import { computed } from "vue";

const getQueryParamOrUndefined = (key: string) =>
  typeof router.currentRoute.value.query[key] === "string"
    ? (router.currentRoute.value.query[key] as string)
    : undefined;

export const ORDERING_FIELDS = ["id", "name"];

const searchQuery = {
  ordering: computed(
    () => (getQueryParamOrUndefined("ordering") as Ordering) || Ordering.Desc
  ),
  orderingField: computed(
    () => getQueryParamOrUndefined("orderingField") || "id"
  ),
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

export default searchQuery;
