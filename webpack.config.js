const path    = require("path")
const webpack = require("webpack")

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    application: "./app/javascript/application.js"
  },
  output: {
    filename: "[name].js",
    sourceMapFilename: "[file].map",
    path: path.resolve(__dirname, "app/assets/builds"),
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      {
        test: /\.(graphql|gql)$/,
        use: {
          loader: 'graphql-tag/loader',
          options: {
            exclude: /node_modules/,
          }
        }
      }
    ]
  }
}
