import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from "@apollo/client/core";

const URL =
  import.meta.env.MODE === "production"
    ? `${location.protocol}//${location.host}/graphql`
    : `http://${location.hostname}:4000/graphql`;

const httpLink = createHttpLink({
  uri: URL
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache
});

export default apolloClient;
