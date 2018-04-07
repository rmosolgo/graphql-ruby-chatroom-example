using GraphQL::Pro::Routes

Rails.application.routes.draw do
  root to: "landings#show"
  post "/graphql", to: "graphql#query"
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  mount ChatSchema.pusher_webhooks_client, at: "/pusher_webhooks"
  mount ChatSchema.dashboard, at: "/graphql/dashboard"
  mount ChatSchema.operation_store_sync, at: "/graphql/sync"
end
