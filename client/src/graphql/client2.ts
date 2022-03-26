import router from "@/routes";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";

const URL =
  import.meta.env.MODE === "production"
    ? `${location.protocol}//${location.host}/graphql`
    : `http://${location.hostname}:4000/graphql`;

const httpLink = createHttpLink({
  uri: URL
});

let localToken = localStorage.getItem("jwt") || undefined;

const authLink = setContext((_, { headers }) =>
  localToken ? { headers: { ...headers, authorization: localToken } } : headers
);

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});

export const isLoggedIn = () => !!localToken;

export const setJwt = (token?: string, rememberMe: boolean = false) => {
  localToken = token;

  if (token && rememberMe) localStorage.setItem("jwt", token);
  else localStorage.removeItem("jwt");

  if (token) router.push({ name: "Home" });
  else {
    apolloClient.resetStore();
    router.push({ name: "Login" });
  }
};

export default apolloClient;
