"use strict";

const merge = require("webpack-merge");
// const spawn = require("child_process").spawn;

const baseConfig = require("./webpack.common");

module.exports = merge.smart(baseConfig, {
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },
  devServer: {
    port: 80,
    compress: true,
    noInfo: true,
    stats: "errors-only",
    inline: true,
    hot: true,
    headers: { "Access-Control-Allow_Origin": "*" },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false
    }
    // temp
  }
});
