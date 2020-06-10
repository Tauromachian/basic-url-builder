const path = require("path");

var commonJsConfig = {
  target: "node",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "basic-url-builder.node.js",
    libraryTarget: "commonjs-module",
  },
};

var browserConfig = {
  target: "web",
  mode: "production",
  output: {
    libraryTarget: "umd",
    path: path.resolve(__dirname, "dist"),
    filename: "basic-url-builder.min.js",
  },
};

module.exports = [commonJsConfig, browserConfig];
