import jwt from '@fastify/jwt';

import { env } from '../config/env.js';

export const jwtPlugin = (app) => {
  app.register(jwt, {
    secret: env.auth.jwtSecret,
    sign: {
      expiresIn: env.auth.jwtExpiresIn,
    },
  });
};
