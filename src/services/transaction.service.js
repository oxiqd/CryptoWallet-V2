import {createTransaction, getAllTransactions} from "../repositories/transaction.repository.js";
import {depositWalletData, getBalance, withdrawalWalletData} from "../repositories/wallet.repository.js";

export const transactionGetService = () => {
  const transactions = getAllTransactions()
  return transactions;
}


export const transactionCreateService = (data) => {

  if(
    (data.type !== 'deposit' && data.type !== 'withdrawal') ||
    (data.asset !== 'BTC' && data.asset !== 'ETH' && data.asset !== 'USDT') ||
    typeof data.amount !== 'number' ||
    data.amount <= 0
  ) {
    throw new Error('Invalid transaction data');
  }

  if(data.type === 'deposit') {
    depositWalletData(data.asset,data.amount);
  }

  if(data.type === 'withdrawal') {
    if(getBalance(data.asset) < data.amount) {
      throw new Error('Invalid amount');
    }else {
      withdrawalWalletData(data.asset,data.amount);
    }
  }

  const newTransaction = createTransaction({
    walletId: 1,
    type: data.type,
    asset: data.asset,
    amount: data.amount,
    createdAt: new Date().toISOString(),
  })

  return newTransaction;

}