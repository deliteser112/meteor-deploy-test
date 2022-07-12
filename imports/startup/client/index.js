import React from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base'
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloLink, from } from "apollo-link";
import { setContext } from "apollo-link-context";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { MeteorAccountsLink } from 'meteor/apollo'

import 'bootstrap/dist/css/bootstrap.min.css';

import App from "../../ui/App";

const client = new ApolloClient({
  link: ApolloLink.from([
    new MeteorAccountsLink(),
    new HttpLink({
      uri: '/graphql'
    })
  ]),
  cache: new InMemoryCache()
})

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

Meteor.startup(() => {
  render(<ApolloApp />, document.getElementById('app'));
});
