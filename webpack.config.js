const path = require("path");
const webpack = require("webpack");
//const dotenv = require("dotenv");

var copyWebpackPlugin = require("copy-webpack-plugin");
const bundleOutputDir = "./dist";
var SRC = path.resolve(__dirname, "./src/main.js");
//const DIR_NAME = path.join(__dirname, "..");

module.exports = env => {
  const isDevBuild = !(env && env.prod);
  //const result = dotenv.config();

  /*if (result.error) {
    throw result.error;
  }*/

  //console.log(result.parsed);
  return [
    {
      entry: SRC,

      output: {
        filename: "widget.js",
        path: path.resolve(bundleOutputDir)
      },
      devServer: {
        contentBase: bundleOutputDir
      },
      plugins: isDevBuild
        ? [
            new webpack.SourceMapDevToolPlugin(),
            new copyWebpackPlugin([{ from: "demo/" }])
          ]
        : [new webpack.optimize.UglifyJsPlugin()],
      module: {
        rules: [
          { test: /\.html$/i, use: "html-loader" },
          {
            test: /\.css$/i,
            use: [
              "style-loader",
              "css-loader" + (isDevBuild ? "" : "?minimize")
            ]
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            use: "base64-inline-loader?name=[name].[ext]"
          }
        ]
      }
    }
  ];
};
