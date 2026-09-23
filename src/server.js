const http = require('node:http');
const {router} = require("./routes/router.js");

const server = http.createServer((request, response) => {
  router(request, response);
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});