import { pool } from '../db/pool.js';

export const getWalletData = async (walletId) => {
  const result = await pool.query(`
      SELECT
          wallets.id,
          wallets.created_at,
          balances.asset,
          balances.amount
      FROM wallets
               LEFT JOIN balances
                         ON balances.wallet_id = wallets.id
      WHERE wallets.id = $1
      ORDER BY balances.asset;
  `, [walletId]);

  return result.rows;
};

export const getBalance = async (walletId, asset) => {
  const result = await pool.query(`
      SELECT amount
      FROM balances
      WHERE wallet_id = $1 AND asset = $2;
  `, [walletId, asset]);

  return result.rows[0]?.amount;
};

export const depositWalletData = async (asset, amount, walletId) => {
  const result = await pool.query(`
      UPDATE balances
      SET amount = amount + $1
      WHERE wallet_id = $2 AND asset = $3
          RETURNING
      id,
      wallet_id,
      asset,
      amount,
      created_at;
  `, [amount, walletId, asset]);

  return result.rows[0];
};

export const withdrawalWalletData = async (asset, amount, walletId) => {
  const result = await pool.query(`
      UPDATE balances
      SET amount = amount - $1
      WHERE wallet_id = $2 AND asset = $3
          RETURNING
      id,
      wallet_id,
      asset,
      amount,
      created_at;
  `, [amount, walletId, asset]);

  return result.rows[0];
};