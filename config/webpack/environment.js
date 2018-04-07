const { environment } = require('@rails/webpacker')

environment.loaders.append("graphql", {
  test: /\.(graphql|gql)$/,
  use: {
    loader: 'graphql-tag/loader',
    options: {
      exclude: /node_modules/,
    }
  }
})
module.exports = environment
