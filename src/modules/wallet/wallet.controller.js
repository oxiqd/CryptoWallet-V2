import { walletGetService } from './wallet.service.js';

export const getWallet = async () => {
  const wallet = await walletGetService();

  return {
    data: wallet,
  };
};
