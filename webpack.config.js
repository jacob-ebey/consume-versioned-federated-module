const path = require("path");

const { camelCase } = require("camel-case");

const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const pkg = require("./package.json");

function unpkgRemote(name) {
  const version = pkg.dependencies[name];

  return `${camelCase(
    name
  )}@https://unpkg.com/${name}@${version}/dist/browser/remote-entry.js`;
}

/** @type {webpack.Configuration} */
const baseConfig = {
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
};

/** @type {webpack.Configuration} */
const browserConfig = {
  output: {
    path: path.resolve("./dist/browser"),
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.container.ModuleFederationPlugin({
      remotes: {
        "versioned-federated-module": unpkgRemote("versioned-federated-module"),
      },
    }),
  ],
};

/** @type {webpack.Configuration} */
const nodeConfig = {
  target: "node",
  output: {
    path: path.resolve("./dist/node"),
  },
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      remoteType: "commonjs",
      remotes: {
        "versioned-federated-module": "versioned-federated-module",
      },
    }),
  ],
};

module.exports = [
  merge(baseConfig, browserConfig),
  merge(baseConfig, nodeConfig),
];
