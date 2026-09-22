import {wallet} from "../data/wallet.js";

export const getWalletData = ()=>{
  return wallet
}

export const depositWalletData = (asset,amount) => {
  wallet.balances[asset] += amount;

  return wallet;
}

export const withdrawalWalletData = (asset,amount) => {
  wallet.balances[asset] -= amount;

  return wallet;
}

export const getBalance = (asset) => {
  return wallet.balances[asset];
};