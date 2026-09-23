import {ERROR_MESSAGES} from "./error-constants.js";

export class AppError extends Error {
  constructor(code) {
    super(ERROR_MESSAGES[code]);

    this.name = 'AppError';
    this.code = code;
  }
}