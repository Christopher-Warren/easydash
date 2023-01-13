import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql/clientInit";
import { Provider } from "react-redux";

import "../styles/globals.css";
import { store } from "../redux/store";
import SideBar from "../client/src/components/SideBar";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  // console.log("client: ", client);

  const router = useRouter();
  const inDashboard = router.pathname.includes("/dashboard");

  return (
    <ApolloProvider client={client as any}>
      <Provider store={store}>
        {inDashboard && <SideBar />}
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
