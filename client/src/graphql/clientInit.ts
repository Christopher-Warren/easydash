import { ApolloClient, HttpLink, from } from "@apollo/client/";
import { onError } from "@apollo/client/link/error";

import { cache, isLoggedInVar, isAdminVar } from "./cache";

import { addError } from "../redux/error/errorSlice";

import { store } from "../redux/store";
import { EXTEND_TYPE_DEFS } from "./types_extension";

export const typeDefs = EXTEND_TYPE_DEFS;

const httpLink = new HttpLink({
  uri: "/graphql",
  credentials: "include",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((error) => {
      if (error.message.includes("Session expired")) {
        console.log("session expired, login again");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        isLoggedInVar(false);
        isAdminVar(false);
      }

      store.dispatch(addError(error.message));
    });
  }
});

export const client = new ApolloClient({
  cache: cache,
  typeDefs,
  link: from([errorLink, httpLink]),
});
