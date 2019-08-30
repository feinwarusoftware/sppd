"use strict";

require("@babel/polyfill");

const merge = require("webpack-merge");

const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const GoogleFontsPlugin = require("google-fonts-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production";

const baseConfig = require("./webpack.base");

module.exports = merge.smart(baseConfig, {
  entry: {
    app: [
      "@babel/polyfill",
      "./src/app.js"
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode
              // if hmr does not work, this is a forceful method.
              // reloadAll: true
            }
          },
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          "file-loader"
        ]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "url-loader",
          options: {
            // Limit at 50k. Above that it emits separate files
            limit: 50000,

            // url-loader sets mimetype if it's passed.
            // Without this it derives it from the file extension
            mimetype: "application/font-woff",

            // Output below fonts directory
            name: "./fonts/[name].[ext]"
          }
        }
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
      ignoreOrder: false
    }),
    new GoogleFontsPlugin({
      fonts: [
        {
          family: "Roboto",
          variants: [
            "300",
            "400",
            "700",
            "900"
          ]
        }
      ]
    }),
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      title: "Feinwaru SPPD",
      template: "./template.html"
    })
  ],
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
});
