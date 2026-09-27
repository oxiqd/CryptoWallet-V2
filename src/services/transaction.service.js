import {
  createTransaction,
  getTransactionsByWalletId,
  getTransactionById,
} from '../repositories/transaction.repository.js';

import {
  depositWalletData,
  getBalance,
  withdrawalWalletData,
} from '../repositories/wallet.repository.js';

import { ERROR_CODES } from '../errors/error-constants.js';
import { AppError } from '../errors/app-error.js';
import {withTransaction} from "../db/with-transaction.js";

const WALLET_ID_MOCK = 1;

export const transactionGetService = async () => {
  return await getTransactionsByWalletId(WALLET_ID_MOCK);
};

export const transactionGetByIdService = async (id) => {
  const transaction = await getTransactionById(WALLET_ID_MOCK, id);

  if (!transaction) {
    throw new AppError(ERROR_CODES.TRANSACTION_NOT_FOUND);
  }

  return transaction;
};

export const transactionCreateService = async (data) => {
  if (
    (data.type !== 'deposit' && data.type !== 'withdrawal') ||
    (data.asset !== 'BTC' && data.asset !== 'ETH' && data.asset !== 'USDT') ||
    typeof data.amount !== 'number'
  ) {
    throw new AppError(ERROR_CODES.INVALID_TRANSACTION_DATA);
  }

  if (data.amount <= 0) {
    throw new AppError(ERROR_CODES.INVALID_TRANSACTION_AMOUNT);
  }

  return await withTransaction(async (db) => {
    if (data.type === 'deposit') {
      const updatedBalance = await depositWalletData(
        db,
        data.asset,
        data.amount,
        WALLET_ID_MOCK,
      );

      if (!updatedBalance) {
        throw new AppError(ERROR_CODES.BALANCE_NOT_FOUND);
      }

      return updatedBalance;
    }

    if (data.type === 'withdrawal') {
      const balance = await getBalance(
        db,
        WALLET_ID_MOCK,
        data.asset,
      );

      if (Number(balance) < data.amount) {
        throw new AppError(ERROR_CODES.INSUFFICIENT_FUNDS);
      }

      await withdrawalWalletData(db,
        data.asset,
        data.amount,
        WALLET_ID_MOCK
      );
    }

    return await createTransaction(db,{
      walletId: WALLET_ID_MOCK,
      type: data.type,
      asset: data.asset,
      amount: data.amount,
    });
  });
};