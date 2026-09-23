import {getHealth} from "../controllers/health.controller.js";
import {ROUTER_RESPONSE} from "../constants.js";

export const heathRoutes = (request,response) => {
  if(request.method === 'GET' && request.url === '/health'){
    getHealth(request,response);
    return ROUTER_RESPONSE.HANDLED
  }
  return ROUTER_RESPONSE.NOT_FOUND
}


