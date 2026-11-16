const { EsbuildPlugin } = require('esbuild-loader');

// Build-speed override for `craco build` (wraps react-scripts).
// Replaces webpack's default TerserPlugin — the slowest single step once
// sourcemaps are disabled — with esbuild's parallel JS+CSS minifier.
// Babel stays in place for transpilation (JSX, CRA presets, compat).
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      if (webpackConfig.mode === 'production') {
        webpackConfig.optimization.minimizer = [
          new EsbuildPlugin({ target: 'es2015', css: true }),
        ];
      }
      return webpackConfig;
    },
  },
};
