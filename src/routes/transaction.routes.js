import {createTransaction, getTransaction, getTransactionById} from "../controllers/transaction.controller.js";

export const transactionRoutes = (request, response) => {

  const pathParameters = request.url.split('/');
  const resource = pathParameters[1];
  const parameter = pathParameters[2];

  if (
    request.method === 'GET' &&
    resource === 'transactions' &&
    parameter && pathParameters.length === 3
  ) {
    getTransactionById(request, response, Number(parameter));
    return true;
  }

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

