import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from "@apollo/client";
import PusherLink from "graphql-ruby-client/subscriptions/PusherLink"
// Load Pusher and create a client
import Pusher from "pusher-js"
var pusherClient = new Pusher("131476891f12b8936fa7", { cluster: "us2" })

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
  httpLink
])

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client