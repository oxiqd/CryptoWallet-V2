import {createTransaction,getTransaction} from "../controllers/transaction.controller.js";

export const transactionRoutes = (request, response) => {
  if (request.method === 'GET' && request.url === '/transactions') {
    getTransaction(request, response);
    return true;
  }

  if (request.method === 'POST' && request.url === '/transactions') {
    createTransaction(request, response);
    return true;
  }

  return false;
};

