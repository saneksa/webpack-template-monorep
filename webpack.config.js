const path = require("path");
const os = require("os");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const minimizer = require("./webpack/minimizer");
const devServer = require("./webpack/devServer");
const bundleAnalyzer = require("./webpack/bundleAnalyzer");
const babelLoader = require("./webpack/babel");
const styles = require("./webpack/styles");
const _ = require("lodash");

const PATHS = {
  packages: path.join(__dirname, "packages"),
  buildPath: path.join(__dirname, "build"),
  publicPath: path.join(__dirname, "public"),
  analyzePort: 8888,
};

const common = (mode) => {
  const isDev = mode === "development";

  return merge([
    {
      mode,
      entry: {
        index: `${PATHS.packages}/core/src/index.ts`,
      },
      output: {
        path: PATHS.buildPath,
        filename: isDev ? "./static/js/[name].js" : "static/js/[contenthash].js",
        chunkFilename: isDev ? "./static/js/[name].[id].js" : "static/js/[contenthash].js",
        clean: true,
      },
      optimization: {
        splitChunks: {
          chunks: "all",
          maxSize: 1024 * 244,
        },
        runtimeChunk: {
          name: (entrypoint) => `runtime-${entrypoint.name}`,
        },
      },
      resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules/,
            use: [
              babelLoader(isDev), //должен быть последним (1м в списке)
              {
                loader: "ts-loader",
                options: {
                  transpileOnly: true,
                  happyPackMode: true,
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: `${PATHS.publicPath}/index.html`,
          inject: true,
          favicon: `${PATHS.publicPath}/taxi.ico`,
          minify: {
            minifyCSS: !isDev,
            minifyJS: !isDev,
            removeComments: !isDev,
          },
        }),
        new ForkTsCheckerWebpackPlugin({
          async: true,
          typescript: {
            diagnosticOptions: {
              semantic: true,
              syntactic: true,
            },
            memoryLimit: 2048,
          },
        }),
        new webpack.DefinePlugin({
          "process.env": {
            NODE_ENV: JSON.stringify(mode),
          },
        }),
      ],
      devtool: isDev ? "cheap-module-source-map" : false,
      stats: "none",
    },
  ]);
};

module.exports = function (env, argv) {
  if (argv.mode === "production") {
    return merge([common(argv.mode), styles(false), minimizer]);
  }

  if (argv.mode === "development") {
    return merge([
      common(argv.mode),
      styles(true),
      devServer(),
      // bundleAnalyzer(PATHS.bundleAnalyzer),
    ]);
  }
};
