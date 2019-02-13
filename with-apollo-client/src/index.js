import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

// must match where your graphql server lives
const GRAPHQL_URI = "http://localhost:3775/graphql";
const client = new ApolloClient({ uri: GRAPHQL_URI });

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
