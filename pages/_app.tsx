import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql/clientInit";

import "../styles/globals.css";

import SideBar from "../components/SideBar";
import { Router, useRouter } from "next/router";
import { ThemeContextProvider } from "../hooks/useTheme";
import Navbar from "../components/navigation/store-navigation/Navbar";
import React from "react";
import { ClipLoader } from "react-spinners";
import RingLoader from "react-spinners/RingLoader";
import CircleLoader from "react-spinners/CircleLoader";
import MoonLoader from "react-spinners/MoonLoader";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const inLogin = router.pathname.includes("/dashboard/login");
  const inDashboard = router.pathname.includes("/dashboard");

  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("finished");
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
        <div className="dark bg-gray-900 min-h-screen">
          {inDashboard && !inLogin && <SideBar />}
          {!inDashboard && <Navbar />}

          <Component {...pageProps} />
        </div>
      </ThemeContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
