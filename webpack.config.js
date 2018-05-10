const path = require("path");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  devServer: {
    contentBase: "./dist",
    stats: 'errors-only'
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
