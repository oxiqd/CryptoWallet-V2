import {getWallet} from "../controllers/wallet.controller.js";
import {ROUTER_RESPONSE} from "../constants.js";

export const walletRoutes = (request, response) => {
  if(request.method === "GET" && request.url === "/wallet") {
    getWallet(request,response)
    return ROUTER_RESPONSE.HANDLED
  }
  return ROUTER_RESPONSE.NOT_FOUND
}