import {createTransaction, getAllTransactions, getTransactionById} from "../repositories/transaction.repository.js";
import {depositWalletData, getBalance, withdrawalWalletData} from "../repositories/wallet.repository.js";
import {ERROR_CODES} from "../errors/error-constants.js";
import {AppError} from "../errors/app-error.js";

export const transactionGetService = () => {
  return getAllTransactions();
}

export const transactionGetByIdService = (id) => {
  const transaction = getTransactionById(id);

  if(!transaction){
    throw new AppError(ERROR_CODES.TRANSACTION_NOT_FOUND)
  }
  return transaction;
}

export const transactionCreateService = (data) => {

  if(
    (data.type !== 'deposit' && data.type !== 'withdrawal') ||
    (data.asset !== 'BTC' && data.asset !== 'ETH' && data.asset !== 'USDT') ||
    typeof data.amount !== 'number' ||
    data.amount <= 0
  ) {
    throw new AppError(ERROR_CODES.INVALID_TRANSACTION_DATA);
  }

  if(data.type === 'deposit') {
    depositWalletData(data.asset,data.amount);
  }

  if(data.type === 'withdrawal') {
    if(getBalance(data.asset) < data.amount) {
      throw new AppError(ERROR_CODES.INVALID_TRANSACTION_AMOUNT);
    }else {
      withdrawalWalletData(data.asset,data.amount);
    }
  }

  return createTransaction({
    walletId: 1,
    type: data.type,
    asset: data.asset,
    amount: data.amount,
    createdAt: new Date().toISOString(),
  });

}