import {
  createTransaction,
  getTransactionById,
  getTransactions,
} from './transaction.controller.js';
import { createTransactionSchema, getTransactionByIdSchema } from './transaction.schema.js';

export const transactionRoutes = async (app) => {
  app.get('/', getTransactions);

  app.get('/:id', {
    schema: getTransactionByIdSchema,
    handler: getTransactionById,
  });

  app.post('/', {
    schema: createTransactionSchema,
    handler: createTransaction,
  });
};
