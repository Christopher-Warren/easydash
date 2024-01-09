import { ApolloClient, HttpLink, from } from "@apollo/client/";
import { onError } from "@apollo/client/link/error";

import { cache } from "./cache";

import { EXTEND_TYPE_DEFS } from "./types_extension";

export const typeDefs = EXTEND_TYPE_DEFS;

const httpLink = new HttpLink({
  uri: "/api/graphql",
  credentials: "include",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {});

export const client = new ApolloClient({
  cache: cache,
  typeDefs,
  link: from([errorLink, httpLink]),
});
