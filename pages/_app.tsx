import { ApolloProvider, useQuery } from "@apollo/client";
import { client } from "../graphql/clientInit";

import "../styles/globals.css";

import SideBar from "../components/SideBar";
import { Router, useRouter } from "next/router";
import { ThemeContextProvider } from "../hooks/useTheme";
import Navbar from "../components/navigation/store-navigation/Navbar";
import MoonLoader from "react-spinners/MoonLoader";

import { useEffect, useState } from "react";
import { GET_SHOP_HOME_DATA } from "../graphql/query_vars";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const inLogin = router.pathname.includes("/dashboard/login");
  const inDashboard = router.pathname.includes("/dashboard");

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <ApolloProvider client={client as any}>
      <ThemeContextProvider>
        <div className="w-full h-screen absolute flex items-center justify-center z-50 pointer-events-none">
          <MoonLoader
            color="#A855F7"
            loading={loading}
            aria-label="Loading Spinner"
          />
        </div>
        {inDashboard ? (
          <div className="dark bg-gray-900 min-h-screen">
            {!inLogin && <SideBar />}

            <Component {...pageProps} />
          </div>
        ) : (
          <div className="min-h-screen">
            <Navbar />
            <Component {...pageProps} />
          </div>
        )}
      </ThemeContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
