import Fastify from 'fastify';

import { healthRoutes } from './modules/health/health.routes.js';
import { walletRoutes } from './modules/wallet/wallet.routes.js';
import { transactionRoutes } from './modules/transactions/transaction.routes.js';

import { errorHandlerPlugin } from './plugins/error-handler.plugin.js';

export const buildApp = () => {
  const app = Fastify({
    logger: true,
  });

  app.register(errorHandlerPlugin);

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
