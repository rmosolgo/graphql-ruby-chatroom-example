using GraphQL::Pro::Routes
Rails.application.routes.draw do
  root to: "landings#show"
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"
  mount ChatroomExampleSchema.pusher_webhooks_client, at: "/pusher_webhooks"
end
