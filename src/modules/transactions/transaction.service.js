import {
  createTransaction,
  getTransactionsByWalletId,
  getTransactionById,
} from './transaction.repository.js';

import {
  depositWalletData,
  getBalance,
  withdrawalWalletData,
} from '../wallet/wallet.repository.js';

import { withTransaction } from '../../db/with-transaction.js';
import { ERROR_CODES } from '../../errors/error-codes.js';
import { AppError } from '../../errors/app-error.js';
import { WALLET_ID_MOCK } from '../../shared/constants/wallet.constants.js';

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
      await depositWalletData(db, data.asset, data.amount, WALLET_ID_MOCK);
    }

    if (data.type === 'withdrawal') {
      const balance = await getBalance(db, WALLET_ID_MOCK, data.asset);

      if (Number(balance) < data.amount) {
        throw new AppError(ERROR_CODES.INSUFFICIENT_FUNDS);
      }

      await withdrawalWalletData(db, data.asset, data.amount, WALLET_ID_MOCK);
    }

    return await createTransaction(db, {
      walletId: WALLET_ID_MOCK,
      type: data.type,
      asset: data.asset,
      amount: data.amount,
    });
  });
};
