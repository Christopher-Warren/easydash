import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql/clientInit";

import "../styles/globals.css";

import SideBar from "../components/SideBar";
import { useRouter } from "next/router";
import { ThemeContextProvider } from "../hooks/useTheme";
import Navbar from "../components/navigation/store-navigation/Navbar";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const inLogin = router.pathname.includes("/dashboard/login");
  const inDashboard = router.pathname.includes("/dashboard");

  return (
    <ApolloProvider client={client as any}>
      <ThemeContextProvider>
        <div className="dark bg-gray-900">
          {inDashboard && !inLogin && <SideBar />}
          {!inDashboard && <Navbar />}

          <Component {...pageProps} />
        </div>
      </ThemeContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
