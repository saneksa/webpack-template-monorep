module.exports = function() {
  return {
    devServer: {
      stats: "minimal",
      overlay: false,
      compress: true,
      liveReload: false,
      hot: false,
      port: 3000,
      historyApiFallback: true,
      injectClient: false
    }
  };
};
