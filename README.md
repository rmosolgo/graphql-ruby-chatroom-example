# Chatroom Example

This isn't a very good app, but it demonstrates a few GraphQL-Ruby features:

- Pusher Subscriptions
- Persisted Queries

It uses Apollo 2, but not the react bindings. Instead, the queries are lumped into one [API client](https://github.com/rmosolgo/graphql-ruby-chatroom-example/blob/master/app/javascript/packs/Api.js).

If you have a question or suggestion, feel free to open an issue!

## Development

- `bundle install`
- Setup webhooks:
  - `ngrok http 3000`
  - Add the webhook to pusher, eg "channel presence" to `https://ff0ca056.ngrok.io/pusher_webhooks`
- `bundle exec rails server`

## Pusher Subscriptions

- JS configuration
  - [Imports & setup](https://github.com/rmosolgo/graphql-ruby-chatroom-example/blob/master/app/javascript/packs/GraphQLClient.js#L5-L8)
  - [Adding to Apollo Link](https://github.com/rmosolgo/graphql-ruby-chatroom-example/blob/master/app/javascript/packs/GraphQLClient.js#L34)
- Server setup
  - [Webhook endpoint](https://github.com/rmosolgo/graphql-ruby-chatroom-example/blob/master/config/routes.rb#L13)
  - [Trigger](https://github.com/rmosolgo/graphql-ruby-chatroom-example/blob/master/app/graphql/mutations/post_message.rb#L22-L23)
  - [`X-Subscription-ID` header](https://github.com/rmosolgo/graphql-ruby-chatroom-example/blob/master/app/controllers/graphql_controller.rb#L23-L25)
- Client usage
  - [`client.subscribe`](https://github.com/rmosolgo/graphql-ruby-chatroom-example/blob/master/app/javascript/packs/Api.js#L36-L39)
  - [listen for updates in the component](https://github.com/rmosolgo/graphql-ruby-chatroom-example/blob/master/app/javascript/packs/App.js#L157-L167)

## Persisted Queries

- [Static GraphQL files](https://github.com/rmosolgo/graphql-ruby-chatroom-example/tree/master/app/javascript/packs/graphql)
  - [Imported as JS](https://github.com/rmosolgo/graphql-ruby-chatroom-example/blob/master/app/javascript/packs/Api.js#L2-L6)
- JS configuration
  - [Imports](https://github.com/rmosolgo/graphql-ruby-chatroom-example/blob/master/app/javascript/packs/GraphQLClient.js#L9-L10)
  - [Adding to Apollo Link](https://github.com/rmosolgo/graphql-ruby-chatroom-example/blob/master/app/javascript/packs/GraphQLClient.js#L35)
- Controller setup:
  - [`context[:operation_id]`](https://github.com/rmosolgo/graphql-ruby-chatroom-example/blob/master/app/controllers/graphql_controller.rb#L6)
- Syncing
  - [Rails route](https://github.com/rmosolgo/graphql-ruby-chatroom-example/blob/master/config/routes.rb#L14)
  - [`sync` command](https://github.com/rmosolgo/graphql-ruby-chatroom-example/blob/master/lib/tasks/sync_graphql.rake#L3-L10)
  - [Generated output](https://github.com/rmosolgo/graphql-ruby-chatroom-example/blob/master/app/javascript/packs/OperationStoreClient.js)

Dashboard:

<img width="1026" alt="image" src="https://user-images.githubusercontent.com/2231765/38712687-4278f6c6-3e9b-11e8-98c9-a51d89990035.png">

Request Params:

<img width="494" alt="image" src="https://user-images.githubusercontent.com/2231765/38712699-58468950-3e9b-11e8-95ac-8057a5e6ab4d.png">
