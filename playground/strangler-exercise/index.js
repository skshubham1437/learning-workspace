const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

function getPort(name, fallback) {
  const value = Number(process.env[name]);

  return Number.isInteger(value) && value > 0 ? value : fallback;
}

function startApp(name, port, configure) {
  const app = express();

  if (configure) {
    configure(app);
  }

  app.listen(port, () => {
    console.log(`${name} listening on ${port}`);
  });
}

const monolithPort = getPort('MONOLITH_PORT', 3000);
const campaignPort = getPort('CAMPAIGN_PORT', 3001);
const gatewayPort = getPort('GATEWAY_PORT', 8080);

startApp('Monolith', monolithPort, app => {
  app.use((req, res) => {
    res.json({ src: 'monolith' });
  });
});

startApp('Campaign Service', campaignPort, app => {
  app.get('/api/campaigns', (req, res) => {
    res.json({ src: 'microservice', data: 'campaign info' });
  });
});

startApp('API Gateway', gatewayPort, app => {
  app.use(
    '/api/campaigns',
    createProxyMiddleware({
      target: `http://localhost:${campaignPort}`,
      changeOrigin: true,
      pathRewrite: {
        '^/': '/api/campaigns',
      },
    })
  );

  app.use(
    createProxyMiddleware({
      target: `http://localhost:${monolithPort}`,
      changeOrigin: true,
    })
  );
});