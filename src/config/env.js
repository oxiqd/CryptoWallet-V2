export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',

  server: {
    host: process.env.SERVER_HOST ?? 'localhost',
    port: Number(process.env.SERVER_PORT ?? 3000),
  },

  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};
