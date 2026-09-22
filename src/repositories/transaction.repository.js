import { transactions } from '../data/transactions.js';

export const getAllTransactions = () => {
  return transactions;
};

export const getTransactionById = (transactionId) => {
  return transactions.find(transaction => transaction.id === transactionId)
};


export const createTransaction = (data) => {

  const transaction = {
    id: transactions.length + 1,
    ...data
  }

  transactions.push(transaction);

  return transaction;
};