const app = require('./app');

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`[launchpad] listening on port ${port}`);
});

// Graceful shutdown — production practice
const shutdown = (signal) => {
  console.log(`[launchpad] ${signal} received, shutting down gracefully`);
  server.close(() => {
    console.log('[launchpad] closed');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));