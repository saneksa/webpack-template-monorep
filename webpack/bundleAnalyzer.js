const WebpackBundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = (analyzePort) => ({
  plugins: [
    new WebpackBundleAnalyzer({
      analyzerMode: "server",
      analyzerHost: "127.0.0.1",
      analyzerPort: analyzePort,
      defaultSizes: "parsed",
      openAnalyzer: false,
      logLevel: "info",
    }),
  ],
});
