const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const minimizer = require("./webpack/minimizer");
const devServer = require("./webpack/devServer");
const overlay = require("./webpack/overlay");
const bundleAnalyzer = require("./webpack/bundleAnalyzer");
const duplicatePackage = require("./webpack/duplicatePackage");

const PATHS = {
  packages: path.join(__dirname, "packages"),
  buildPath: path.join(__dirname, "build"),
  publicPath: path.join(__dirname, "public"),
  analyzePort: 8888
};

const common = merge([
  {
    entry: {
      index: `${PATHS.packages}/app/src/index.tsx`
    },
    output: {
      path: PATHS.buildPath,
      filename: "./static/js/[name].js",
      chunkFilename: "static/js/[id].js"
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          common: {
            chunks: "all",
            name: true,
            maxSize: 1024 * 244
          }
        }
      },
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`
      }
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
              options: {
                // disable type checker - we will use it in fork plugin
                transpileOnly: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${PATHS.publicPath}/index.html`,
        inject: true,
        favicon: `${PATHS.publicPath}/taxi.ico`
      }),
      new ForkTsCheckerWebpackPlugin({
        // eslint: true,
        tsconfig: path.resolve(__dirname, "tsconfig.json"),
        useTypescriptIncrementalApi: true,
        checkSyntacticErrors: true,
        measureCompilationTime: true,
        async: false
      })
    ]
  }
]);

module.exports = function(env, argv) {
  if (argv.mode === "production") {
    return merge([common, minimizer]);
  }
  if (argv.mode === "development") {
    return merge([
      common,
      devServer(),
      overlay,
      bundleAnalyzer(PATHS.bundleAnalyzer),
      duplicatePackage
    ]);
  }
};
