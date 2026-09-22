const http = require('node:http');

const {heathRoutes} = require("./routes/health.routes.js");
const {walletRoutes} = require("./routes/wallet.routes.js");
const {transactionRoutes} = require("./routes/transaction.routes.js");

const server = http.createServer((request, response) => {
  console.log(request.method, request.url);

  if (heathRoutes(request, response)) return;
  if (walletRoutes(request, response)) return;
  if (transactionRoutes(request, response)) return;

  response.statusCode = 404;
  response.setHeader('Content-Type', 'application/json');

  response.end(
    JSON.stringify({
      error: 'Not found',
    })
  );
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});