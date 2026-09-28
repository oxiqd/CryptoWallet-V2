import { loginUserService, registerUserService } from './auth.service.js';

const createAccessToken = (app, user) =>
  app.jwt.sign({
    sub: user.id,
    email: user.email,
  });

export const registerUser = async (request, reply) => {
  const result = await registerUserService(request.body);

  const accessToken = createAccessToken(request.server, result.user);

  return reply.code(201).send({
    data: {
      user: result.user,
      wallet: result.wallet,
      accessToken,
    },
  });
};

export const loginUser = async (request) => {
  const result = await loginUserService(request.body);

  const accessToken = createAccessToken(request.server, result.user);

  return {
    data: {
      user: result.user,
      accessToken,
    },
  };
};
