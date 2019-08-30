"use strict";

const webpack = require("webpack");
const merge = require("webpack-merge");

const baseConfig = require("./webpack.common");

module.exports = merge.smart(baseConfig, {
  entry: {
    app: [
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
      "@babel/polyfill",
      "./src/app.js"
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
