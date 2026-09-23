import {
  transactionCreateService,
  transactionGetByIdService,
  transactionGetService
} from "../services/transaction.service.js";
import {handleError} from "../errors/http-error-handler.js";
import {AppError} from "../errors/app-error.js";
import {ERROR_CODES} from "../errors/error-constants.js";

export const getTransactionById = (request, response,id) => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json")

  let transaction;

  try {
   transaction = transactionGetByIdService(id)
  }catch (error){
    return handleError(error,response)
  }

  response.end(
    JSON.stringify({
      data: transaction
    })
  )
};

export const getTransaction = (request, response) => {
  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json")

  const transactions = transactionGetService()

  response.end(
    JSON.stringify({
      data: transactions
    })
  )
};

export const createTransaction = (request, response) => {
// Request body is a stream: data arrives in chunks,
// so we collect it first and process the complete body on `end`.

  let body = ''

  request.on('data',(chunk) => {
    body += chunk
  })

  request.on('end', () => {
    let data;

    try{
      data = JSON.parse(body);
    }catch{
      return handleError(
        new AppError(ERROR_CODES.INVALID_JSON),
        response
      );    }

    let newTransaction;

    try{
      newTransaction = transactionCreateService(data)
    }catch (error) {
        return handleError(error,response)
    }

    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json")

    response.end(
      JSON.stringify({
        data: newTransaction
      })
    )

  })
};

