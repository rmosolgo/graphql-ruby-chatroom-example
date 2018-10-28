import { ApolloClient } from "apollo-client";
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import AblyLink from "graphql-ruby-client/subscriptions/AblyLink"
// Load Ably and create a client
const Ably = require("ably")
const ablyClient = new Ably.Realtime('u0LX_A.FUduaw:BrJ4IV9DZBsUvnWb')
// Get the generated module for persisted queries:
import OperationStoreClient from "./OperationStoreClient"

const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');
const httpLink = createHttpLink({
  uri: "/graphql",
  credentials: 'same-origin',
})

const authLink = (operation, forward) => {
  operation.setContext(context => {
    return {
      ...context,
      headers: {
        ...context.headers,
        "X-CSRF-TOKEN": csrfToken,
      },
    }
  });

  return forward(operation);
};

const link = ApolloLink.from([
  authLink,
  new AblyLink({ably: ablyClient}),
  OperationStoreClient.apolloLink,
  httpLink
])

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client
