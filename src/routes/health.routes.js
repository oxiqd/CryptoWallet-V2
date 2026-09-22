import {getHealth} from "../controllers/health.controller.js";

export const heathRoutes = (request,response) => {
  if(request.method === 'GET' && request.url === '/health'){
    getHealth(request,response);
    return true
  }
  return false;
}


