"use strict";

const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const common = require("./webpack.common");

module.exports = merge(common, {
    mode: "production",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader",
                        "sass-loader"
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css")
    ]
});
