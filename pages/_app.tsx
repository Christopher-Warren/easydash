import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql/clientInit";
import { Provider } from "react-redux";

import "../styles/globals.css";
import { store } from "../redux/store";
import SideBar from "../client/src/components/SideBar";

function MyApp({ Component, pageProps }) {
  // console.log("client: ", client);
  return (
    <ApolloProvider client={client as any}>
      <Provider store={store}>
        <SideBar />
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
