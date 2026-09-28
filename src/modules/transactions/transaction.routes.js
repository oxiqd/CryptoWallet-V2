import {
  createTransaction,
  getTransactionById,
  getTransactions,
} from './transaction.controller.js';

export const transactionRoutes = async (app) => {
  app.get('/', getTransactions);

  app.get('/:id', getTransactionById);

  app.post('/', createTransaction);
};
