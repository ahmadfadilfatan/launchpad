const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    service: 'launchpad',
    version: process.env.APP_VERSION || 'dev',
    status: 'ok',
  });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/ready', (req, res) => {
  res.status(200).send('READY');
});

module.exports = app;