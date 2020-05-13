const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const fs = require("fs");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
var copyWebpackPlugin = require("copy-webpack-plugin");

const SRC = path.resolve(__dirname, "./src/main.js");
const currentPath = path.join(__dirname);

module.exports = (env) => {
  const isDevBuild = !(env && env.ENVIRONMENT !== "development");

  //const result = dotenv.config();
  const basePath = currentPath + "/.env";

  const envPath = basePath + "." + "for" + env.ENVIRONMENT;

  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  /*if (result.error) {
    throw result.error;
  }*/
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  const bundleOutputDir = fileEnv.BUNDLE_OUTPUT_DIR;

  console.log(bundleOutputDir);
  return [
    {
      entry: {
        index: SRC,
      },
      devServer: {
        contentBase: bundleOutputDir,
      },
      output: {
        filename: "eyezonwidget.js",
        publicPath: isDevBuild ? undefined : fileEnv.PUBLIC_PATH,
        chunkFilename: "[name].bundle.js",
        path: path.resolve(bundleOutputDir),
        jsonpFunction: 'webpackJsonpEyezon'
      },
      plugins: [
        ...(isDevBuild
          ? [
              new webpack.SourceMapDevToolPlugin(),
              new copyWebpackPlugin([{ from: "demo/" }]),
            ]
          : []),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.DefinePlugin(envKeys),
      ],
      module: {
        rules: [
          { test: /\.html$/i, use: "html-loader" },
          {
            test: /\.css$/i,
            use: [
              "style-loader",
              "css-loader" + (isDevBuild ? "" : "?minimize"),
            ],
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
            },
          },
          {
            test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            use: "base64-inline-loader?name=[name].[ext]",
          },
          {
            test: /\.mp3$/,
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
    },
  ];
};
