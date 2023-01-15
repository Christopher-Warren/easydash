import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql/clientInit";
import { Provider } from "react-redux";

import "../styles/globals.css";
import { store } from "../redux/store";
import SideBar from "../components/SideBar";
import { useRouter } from "next/router";
import { ThemeContextProvider } from "../hooks/useTheme";
import Navbar from "../components/navigation/store-navigation/Navbar";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const inDashboard = router.pathname.includes("/dashboard");

  return (
    <ApolloProvider client={client as any}>
      <Provider store={store}>
        <ThemeContextProvider>
          <div className="dark bg-gray-900">
            {inDashboard ? <SideBar /> : <Navbar />}
            <Component {...pageProps} />
          </div>
        </ThemeContextProvider>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
