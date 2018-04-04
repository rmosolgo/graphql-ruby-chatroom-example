Rails.application.routes.draw do
  root to: "landings#show"
  post "/graphql", to: "graphql#query"
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
end
