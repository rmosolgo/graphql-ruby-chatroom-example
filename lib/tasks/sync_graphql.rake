namespace :sync_graphql do
  task :local do
    system("
        yarn run graphql-ruby-client sync
          --path=app/javascript/packs/graphql
          --url=http://localhost:3000/graphql/sync
          --outfile=app/javascript/packs/OperationStoreClient.js
          --secret=947afa69bd1a5ff1e613d3a66e976637be62bf55270413e26dd5620587d84b6f
          --client=js-frontend
    ".gsub(/\s+/, " "))
  end
end
