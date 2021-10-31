const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

module.exports = (envVars) =>
{
    const { env } = envVars;
    const envConfig = require(`./webpack.${env === "dev" ? "dev" : "prod"}.js`);
    return merge(commonConfig(env), envConfig);
};
