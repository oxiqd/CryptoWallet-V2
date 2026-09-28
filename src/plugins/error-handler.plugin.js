import { AppError } from '../errors/app-error.js';
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS } from '../errors/error-codes.js';

export const errorHandlerPlugin = async (app) => {
  app.setErrorHandler((error, request, reply) => {
    request.log.error(error);

    if (error instanceof AppError && HTTP_STATUS[error.code]) {
      return reply.code(HTTP_STATUS[error.code]).send({
        error: error.message,
      });
    }

    return reply.code(HTTP_STATUS[ERROR_CODES.INTERNAL_SERVER_ERROR]).send({
      error: ERROR_MESSAGES[ERROR_CODES.INTERNAL_SERVER_ERROR],
    });
  });
};
