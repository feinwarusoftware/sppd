"use strict";

const merge = require("webpack-merge");

const common = require("./webpack.common");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        port: 80,
        host: "0.0.0.0",
        allowedHosts: [
            "dragon.feinwaru.com"
        ],
        compress: true,
        contentBase: "./dist"
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            }
        ]
    }
});
