"use strict";

const path = require("path");

module.exports = {
  mode: "development",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist")
  },
  node: {
    __filename: false,
    __dirname: false
  },
  resolve: [
    ".jsx",
    ".js",
    ".json"
  ],
  devtool: "source-map",
};
