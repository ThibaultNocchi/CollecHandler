import router from "@/routes";
import { createClient } from "@urql/vue";
import { ref } from "vue";

const HOST = `${location.protocol}//${location.host}`;
const URL =
  import.meta.env.MODE === "production"
    ? `${HOST}/graphql`
    : "http://localhost:4000/graphql";

const localToken = localStorage.getItem("jwt") || undefined;

const client = ref(
  createClient({
    url: URL,
    fetchOptions: localToken
      ? { headers: { authorization: localToken } }
      : undefined
  })
);

export const isLoggedIn = () =>
  // @ts-expect-error - headers isn't present in type
  typeof client.value.fetchOptions?.headers?.authorization !== "undefined";

export const setJwt = (token?: string, rememberMe: boolean = false) => {
  client.value = createClient({
    url: URL,
    fetchOptions: token ? { headers: { authorization: token } } : undefined
  });
  if (token && rememberMe) localStorage.setItem("jwt", token);
  else localStorage.removeItem("jwt");
  if (token) router.push({ name: "Home" });
  else router.push({ name: "Login" });
};

export default client;
