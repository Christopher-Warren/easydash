import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql/clientInit";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  // console.log("client: ", client);
  return (
    <ApolloProvider client={client as any}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
