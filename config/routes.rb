using GraphQL::Pro::Routes

Rails.application.routes.draw do
  root to: "landings#show"
  post "/graphql", to: "graphql#query"
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  # TODO: authenticate this endpoint!
  mount ChatSchema.dashboard, at: "/graphql/dashboard"

  mount ChatSchema.ably_webhooks_client, at: "/ably_webhooks"
  mount ChatSchema.operation_store_sync, at: "/graphql/sync"
end
