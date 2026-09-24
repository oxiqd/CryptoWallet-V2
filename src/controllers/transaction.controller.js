import {
  transactionCreateService,
  transactionGetByIdService,
  transactionGetService
} from "../services/transaction.service.js";
import {handleError} from "../errors/http-error-handler.js";
import {AppError} from "../errors/app-error.js";
import {ERROR_CODES} from "../errors/error-constants.js";
import {readRequestBody} from "../utils/read-request-body.js";

export const getTransactionById = async (request, response,id) => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json")

  let transaction;

  try {
   transaction = await transactionGetByIdService(id)
  }catch (error){
    return handleError(error,response)
  }

  response.end(
    JSON.stringify({
      data: transaction
    })
  )
};

export const getTransaction = async (request, response) => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json")

  const transactions = await transactionGetService()

  response.end(
    JSON.stringify({
      data: transactions
    })
  )
};

export const createTransaction = async (request, response) => {
// Request body is a stream: data arrives in chunks,
// so we collect it first and process the complete body on `end`.

  let body;

  try {
    body = await readRequestBody(request);
  } catch (error) {
    return handleError(error, response);
  }

  let data;

  try {
    data = JSON.parse(body);
  } catch {
    return handleError(
      new AppError(ERROR_CODES.INVALID_JSON),
      response
    );
  }

  let newTransaction;

  try {
    newTransaction = await transactionCreateService(data);
  } catch (error) {
    return handleError(error, response);
  }

  response.statusCode = 201;
  response.setHeader('Content-Type', 'application/json');

  response.end(
    JSON.stringify({
      data: newTransaction,
    })
  );
};


