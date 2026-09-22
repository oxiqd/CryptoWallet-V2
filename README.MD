## Crypto Wallet - V1
### Vanilla Node.js Backend

- Pure Node.js — built without backend frameworks.
- Zero Runtime Dependencies — relies only on Node.js built-in modules and APIs.
- Native node:http — the HTTP server is created manually with http.createServer().
- Manual Routing — requests are routed based on request.method and request.url.
- Manual Request Body Parsing — POST request bodies are read from a Readable Stream using data and end events.
- Manual JSON Handling — request and response data is handled with JSON.parse() and JSON.stringify().
- Manual HTTP Responses — status codes, headers, and response bodies are managed directly through the native HTTP API.
- Layered Architecture — Routes → Controllers → Services → Repositories → Data.
- Separation of Concerns — routing, HTTP handling, business logic, and data access are separated into dedicated layers.
- Repository Pattern — business logic is decoupled from the underlying data storage implementation.
- In-Memory Storage — JavaScript objects and arrays are used instead of a database.
- Basic Validation — input validation and business-rule validation are implemented manually.
- Basic Error Handling — service-level errors are propagated to controllers and converted into HTTP responses.
- Mock Crypto Wallet Domain — supports wallet balances and deposit/withdrawal transactions using mock assets.
- REST-like API — provides /health, /wallet, and /transactions endpoints.
- ES Modules — uses native import / export syntax instead of CommonJS.
- No Database / ORM / Query Builder — no PostgreSQL, ORM, or Kysely at this stage.
- No Authentication — no users, login flow, password handling, or JWT yet.
- No Framework Abstractions — routing, middleware, schema validation, dependency injection, and other framework-level features are intentionally implemented manually or not introduced yet.