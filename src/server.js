import * as http from "node:http";
import {router} from "./routes/router.js";

const server = http.createServer(async (request, response) => {
  await router(request, response);
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});