import { createClient } from "@urql/vue";
import { ref } from "vue";

const URL =
  import.meta.env.MODE === "production"
    ? `${location.protocol}//${location.host}/graphql`
    : `http://${location.hostname}:4000/graphql`;

const localToken = localStorage.getItem("jwt") || undefined;

const client = ref(
  createClient({
    url: URL,
    fetchOptions: localToken
      ? { headers: { authorization: localToken } }
      : undefined
  })
);

export default client;
