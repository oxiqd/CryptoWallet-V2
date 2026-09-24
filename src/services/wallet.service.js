import { getWalletData } from '../repositories/wallet.repository.js';

const WALLET_ID_MOCK = 1;

export const walletGetService = async () => {
  return await getWalletData(WALLET_ID_MOCK);
};