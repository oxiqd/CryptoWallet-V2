import {getWalletData} from "../repositories/wallet.repository.js";

export const walletGetService = () => {
  const wallet = getWalletData()
  return wallet;
}

