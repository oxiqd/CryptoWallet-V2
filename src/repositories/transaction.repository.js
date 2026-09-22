import { transactions } from '../data/transactions.js';

export const getAllTransactions = () => {
  return transactions;
};


export const createTransaction = (data) => {

  const transaction = {
    id: transactions.length + 1,
    ...data
  }

  transactions.push(transaction);

  return transaction;
};