import { ApolloClient } from "apollo-client";
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

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

const link = ApolloLink.from([authLink, httpLink])

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client
