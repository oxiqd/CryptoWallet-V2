import {ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS} from "./error-constants.js";
import {AppError} from "./app-error.js";

export const handleError = (error, response) => {

  if(error instanceof AppError && HTTP_STATUS[error.code]){
    const statusCode = HTTP_STATUS[error.code];

    response.statusCode = statusCode;
    response.setHeader('Content-Type', 'application/json');

    response.end(JSON.stringify({
      error: error.message
    }));
    return;
  }

  response.statusCode = HTTP_STATUS[ERROR_CODES.INTERNAL_SERVER_ERROR];
  response.setHeader('Content-Type', 'application/json');

  response.end(JSON.stringify({
    error: ERROR_MESSAGES[ERROR_CODES.INTERNAL_SERVER_ERROR]
  }));

};