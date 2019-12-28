const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false
            }
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("autoprefixer")]
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("autoprefixer")]
            }
          },
          "less-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "/static/css/[name].css",
      chunkFilename: "/static/css/[id].[hash].css"
    })
  ]
};
