import { ApolloClient } from "apollo-client";
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import PusherLink from "graphql-ruby-client/subscriptions/PusherLink"
// Load Pusher and create a client
import Pusher from "pusher-js"
var pusherClient = new Pusher("131476891f12b8936fa7", { cluster: "us2" })
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
  new PusherLink({pusher: pusherClient}),
  OperationStoreClient.apolloLink,
  httpLink
])

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client
