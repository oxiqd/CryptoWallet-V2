
Главное правило, направленность:
server > routes > controllers > services > repositories > data

пропускать слой нельзя

Не обязательно каждый запрос использует абсолютно все слои, 
но зависимость направляем примерно так, а не наоборот.

server.js должен заниматься самим HTTP-сервером и передавать запросы роутеру. 
Никаких WALLET, TRANSACTIONS, проверки баланса и т. п.

# План 

- HTTP API — доделать маршруты, 404/405, query params, получение ресурсов по id.
- HTTP errors — привести обработку ошибок к нормальной структуре.
- SQL основы — SELECT, INSERT, UPDATE, DELETE, JOIN, constraints.
- PostgreSQL — создать настоящую БД и таблицы users, wallets, balances, transactions.
- Node.js ↔ PostgreSQL — подключить БД и заменить mock data на настоящие repository-запросы.
- Async/await + Promise — закрепить на реальных запросах к БД.
- DB transactions — BEGIN / COMMIT / ROLLBACK, атомарное изменение баланса + создание транзакции.
- Auth — регистрация, логин, хеширование паролей, JWT, middleware.
- Fastify — перенести наш ручной Node HTTP API на framework.
- Schema validation — нормальная валидация body/params/query.
- Centralized error handling — свои типы ошибок + единый error handler.
- Kysely — типизированная работа с SQL после того, как сам SQL уже понятен.
- Тесты — unit + integration/API tests.
- Security — CORS, headers, rate limiting, validation, secrets/env.
- Realtime — если понадобится кошельку, добавить обновления без постоянного ручного запроса.
- Frontend ↔ Backend — подключить React-клиент к готовому API.
- Deployment — env, production DB, запуск backend/frontend в production.