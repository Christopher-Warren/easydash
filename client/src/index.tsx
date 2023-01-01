import React from "react";
import ReactDOM from "react-dom";
import "./tailwind.css";

import { client } from "./graphql/clientInit";
import { ApolloProvider } from "@apollo/client";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import { createBrowserHistory } from "history";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <div className="dark">
            <div className="dark:bg-gray-900  bg-white">
              <App />
            </div>
          </div>
        </Router>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
