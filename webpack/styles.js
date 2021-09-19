const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (isDev) => {
  const isProd = !isDev;

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            isDev ? require.resolve("style-loader") : MiniCssExtractPlugin.loader,
            require.resolve("css-loader"),
            {
              loader: require.resolve("postcss-loader"),
              options: {
                postcssOptions: {
                  plugins: [require.resolve("postcss-preset-env")],
                },
              },
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            isDev ? require.resolve("style-loader") : MiniCssExtractPlugin.loader,
            require.resolve("css-loader"),
            {
              loader: require.resolve("postcss-loader"),
              options: {
                postcssOptions: {
                  plugins: [require.resolve("postcss-preset-env")],
                },
              },
            },
            {
              loader: require.resolve("less-loader"),
              options: {
                sourceMap: isDev,
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `/static/css/${isProd ? "[name].[contenthash]" : "[name]"}.css`,
        chunkFilename: `/static/css/${isProd ? "[id].[contenthash]" : "[id]"}.css`,
        ignoreOrder: true,
      }),
    ],
  };
};
