import {createTransaction, getTransaction, getTransactionById} from "../controllers/transaction.controller.js";
import {ROUTER_RESPONSE} from "../constants.js";

const URL_LENGTH_EXPECTED = 3
const URL_SPLIT_SYMBOL = '/'

export const transactionRoutes = async (request, response) => {

  const pathParameters = request.url.split(URL_SPLIT_SYMBOL);
  const resource = pathParameters[1];
  const parameter = pathParameters[2];

  if (
    request.method === 'GET' &&
    resource === 'transactions' &&
    parameter && pathParameters.length === URL_LENGTH_EXPECTED
  ) {
     await getTransactionById(request, response, Number(parameter));
    return ROUTER_RESPONSE.HANDLED
  }

  if (request.method === 'GET' && request.url === '/transactions') {
    await getTransaction(request, response);
    return ROUTER_RESPONSE.HANDLED
  }

  if (request.method === 'POST' && request.url === '/transactions') {
     await createTransaction(request, response);
    return ROUTER_RESPONSE.HANDLED
  }

  if (request.url === '/transactions') {
    return ROUTER_RESPONSE.METHOD_NOT_ALLOWED
  }

  return ROUTER_RESPONSE.NOT_FOUND
};

