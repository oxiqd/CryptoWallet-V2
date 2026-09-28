import { getWalletData } from './wallet.repository.js';
import { WALLET_ID_MOCK } from '../../shared/constants/wallet.constants.js';

export const walletGetService = async () => {
  return await getWalletData(WALLET_ID_MOCK);
};
