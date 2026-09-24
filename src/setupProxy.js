const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/placeholder',
    createProxyMiddleware({
      target: 'https://placehold.co',
      changeOrigin: true,
      pathRewrite: (path) => {
        const size = path.replace(/^\//, '');
        return /^\d+x\d+$/.test(size) ? `/${size}` : '/600x400';
      },
    })
  );
};
