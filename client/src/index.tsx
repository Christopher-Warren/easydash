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

function page() {
  return <div>hello</div>;
}
