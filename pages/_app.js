import { ApolloProvider } from "@apollo/client";
import { client } from "../client/src/graphql/clientInit";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  // console.log("client: ", client);
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
