import Fastify from 'fastify';

import { healthRoutes } from './modules/health/health.routes.js';
import { walletRoutes } from './modules/wallet/wallet.routes.js';
import { transactionRoutes } from './modules/transactions/transaction.routes.js';

import { setupErrorHandler } from './plugins/error-handler.plugin.js';

export const buildApp = () => {
  const app = Fastify({
    logger: true,
  });

  setupErrorHandler(app);

  app.register(healthRoutes, {
    prefix: '/health',
  });

  app.register(walletRoutes, {
    prefix: '/wallet',
  });

  app.register(transactionRoutes, {
    prefix: '/transactions',
  });

  return app;
};
