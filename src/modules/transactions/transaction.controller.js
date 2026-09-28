import {
  transactionCreateService,
  transactionGetByIdService,
  transactionGetService,
} from './transaction.service.js';

export const getTransactions = async () => {
  const transactions = await transactionGetService();

  return {
    data: transactions,
  };
};

export const getTransactionById = async (request) => {
  const transaction = await transactionGetByIdService(Number(request.params.id));

  return {
    data: transaction,
  };
};

export const createTransaction = async (request, reply) => {
  const transaction = await transactionCreateService(request.body);

  return reply.code(201).send({
    data: transaction,
  });
};
