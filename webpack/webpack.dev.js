const ReactRefreshWebpackPlugin = require("react-refresh-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");


module.exports = {
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
        hot: true,
        open: false,
        port: 3000
    },
    plugins: [
        new Dotenv({path:  path.resolve(__dirname, "..", "./.env.dev")}),
        new ReactRefreshWebpackPlugin()
    ]
};
