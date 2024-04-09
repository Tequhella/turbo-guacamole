const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const port = 4000;

const apiProxyNode = createProxyMiddleware('/graphql', {
  target: 'http://localhost:5001',
  changeOrigin: true,
});

const apiProxyPython = createProxyMiddleware('/graphql', {
  target: 'http://localhost:5000',
  changeOrigin: true,
});

app.use((req, res, next) => {
  //const useNodeJSApi = Math.random() < 0.5;
  
  if (true) {
    console.log("passe par node");
    apiProxyNode(req, res, next);
  }
  else {
    console.log("passe par python");
    apiProxyPython(req, res, next);
  }
});

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`Load Balancer listening at http://localhost:${port}`);
});
