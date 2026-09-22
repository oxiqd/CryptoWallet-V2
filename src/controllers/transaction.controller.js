import {transactionCreateService, transactionGetService} from "../services/transaction.service.js";

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
  // тут показана работа stream, что контроллер не получает данные тела запроса сразу головыми, это поток байтов
  // поэтому мы сначала собираем их, а в конце реквеста орудуем уже целостными данными которые мы собрали
  let body = ''

  request.on('data',(chunk) => {
    body += chunk
  })

  request.on('end', () => {
    let data;

    try{
      data = JSON.parse(body);
    }catch (error) {
      response.statusCode = 400;
      response.setHeader("Content-Type", "application/json")

      response.end(
        JSON.stringify({
          error:"Parse error"
        })
      )
    }

    let newTransaction;

    try{
      newTransaction = transactionCreateService(data)
    }catch (error) {
        response.statusCode = 400;
        response.setHeader("Content-Type", "application/json")

        response.end(
          JSON.stringify({
           error: error.message,
          })
        )
        return;
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

