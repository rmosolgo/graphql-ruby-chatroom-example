# Chatroom Example

This isn't a very good app, but it demonstrates a few GraphQL-Ruby features:

- Pusher Subscriptions
- ~~Persisted Queries~~ -- rewritten with out this. Let me know if you'd like me to add it back!

It uses Apollo 3, but not the react bindings. Instead, the queries are lumped into one [API client](https://github.com/rmosolgo/graphql-ruby-chatroom-example/blob/master/app/javascript/Api.js).

If you have a question or suggestion, feel free to open an issue!

## Development

- `bundle install`
- Setup webhooks:
  - `ngrok http 3000`
  - Add the webhook to pusher, eg "channel presence" to `https://ff0ca056.ngrok.io/pusher_webhooks`
- `bin/dev`

## Pusher Subscriptions

- JS configuration
  - [Imports & setup](https://github.com/rmosolgo/graphql-ruby-chatroom-example/blob/master/app/javascript/GraphQLClient.js#L1-L4)
  - [Adding to Apollo Link](https://github.com/rmosolgo/graphql-ruby-chatroom-example/blob/master/app/javascript/GraphQLClient.js#L34)
- Server setup
  - [Webhook endpoint](https://github.com/rmosolgo/graphql-ruby-chatroom-example/blob/master/config/routes.rb#L13)
  - [Trigger](https://github.com/rmosolgo/graphql-ruby-chatroom-example/blob/master/app/graphql/mutations/post_message.rb#L22-L23)
  - [`X-Subscription-ID` header](https://github.com/rmosolgo/graphql-ruby-chatroom-example/blob/master/app/controllers/graphql_controller.rb#L16-L18)
- Client usage
  - [`client.subscribe`](https://github.com/rmosolgo/graphql-ruby-chatroom-example/blob/master/app/javascript/Api.js#L36-L39)
  - [listen for updates in the component](https://github.com/rmosolgo/graphql-ruby-chatroom-example/blob/master/app/javascript/App.js#L173-L186)
