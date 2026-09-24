import { heathRoutes } from './health.routes.js';
import { walletRoutes } from './wallet.routes.js';
import { transactionRoutes } from './transaction.routes.js';

import { handleError } from '../errors/http-error-handler.js';
import { AppError } from '../errors/app-error.js';
import { ERROR_CODES } from '../errors/error-constants.js';
import {ROUTER_RESPONSE} from "../constants.js";

const routes = [
  heathRoutes,
  walletRoutes,
  transactionRoutes,
];

export const router = async (request, response) => {
  let methodNotAllowed = false;

  try {
    for (const route of routes) {
      const result = await route(request, response);

      if (result === ROUTER_RESPONSE.HANDLED) {
        return;
      }

      if (result === ROUTER_RESPONSE.METHOD_NOT_ALLOWED) {
        methodNotAllowed = true;
      }
    }

    if (methodNotAllowed) {
      throw new AppError(ERROR_CODES.METHOD_NOT_ALLOWED);
    }

    throw new AppError(ERROR_CODES.NOT_FOUND);

  } catch (error) {
    return handleError(error, response);
  }
};