const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Run the same protected lesson handler locally as on Netlify. Paid content
  // stays in the Node process and is never imported into the client bundle.
  app.all('/.netlify/functions/masterclass', async (req, res, next) => {
    try {
      const { handler } = require('../netlify/functions/masterclass');
      const result = await handler({
        httpMethod: req.method,
        headers: req.headers,
        queryStringParameters: req.query,
      });
      res.status(result.statusCode).set(result.headers).send(result.body);
    } catch (error) {
      next(error);
    }
  });
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
