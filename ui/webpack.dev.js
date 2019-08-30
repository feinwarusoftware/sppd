"use strict";

const webpack = require("webpack");
const merge = require("webpack-merge");

const baseConfig = require("./webpack.common");

module.exports = merge.smart(baseConfig, {
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
