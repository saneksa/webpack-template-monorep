const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const minimizer = require("./webpack/minimizer");
const devServer = require("./webpack/devServer");
const overlay = require("./webpack/overlay");
const bundleAnalyzer = require("./webpack/bundleAnalyzer");
const duplicatePackage = require("./webpack/duplicatePackage");
const babelLoader = require("./webpack/babel");
const styles = require("./webpack/styles");
const _ = require("lodash");

const PATHS = {
  packages: path.join(__dirname, "packages"),
  buildPath: path.join(__dirname, "build"),
  publicPath: path.join(__dirname, "public"),
  analyzePort: 8888
};

const common = mode => {
  const isDev = mode === "development";

  return merge([
    {
      entry: {
        index: `${PATHS.packages}/expander/src/index.ts`
      },
      output: {
        path: PATHS.buildPath,
        filename: isDev ? "./static/js/[name].js" : "static/js/[contenthash].js",
        chunkFilename: isDev ? "./static/js/[name].[id].js" : "static/js/[contenthash].js"
      },
      optimization: {
        splitChunks: {
          chunks: "all",
          maxSize: 1024 * 244
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
              // babelLoader(),
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
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: `${PATHS.publicPath}/index.html`,
          inject: true,
          favicon: `${PATHS.publicPath}/taxi.ico`,
          minify: {
            minifyCSS: !isDev,
            minifyJS: !isDev,
            removeComments: !isDev
          }
        }),
        new ForkTsCheckerWebpackPlugin({
          // eslint: true,
          tsconfig: path.resolve(__dirname, "tsconfig.json"),
          useTypescriptIncrementalApi: true,
          checkSyntacticErrors: true,
          measureCompilationTime: true,
          async: false
        }),
        new webpack.DefinePlugin({
          "process.env": {
            NODE_ENV: JSON.stringify(mode)
          }
        })
      ],
      performance: {
        hints: "warning"
      }
    },
    styles(isDev)
  ]);
};

module.exports = function(env, argv) {
  if (argv.mode === "production") {
    return merge([common(argv.mode), minimizer]);
  }

  if (argv.mode === "development") {
    return merge([
      common(argv.mode),
      devServer(),
      overlay,
      bundleAnalyzer(PATHS.bundleAnalyzer),
      duplicatePackage
    ]);
  }
};
