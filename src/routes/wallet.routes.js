import {getWallet} from "../controllers/wallet.controller.js";
import {ROUTER_RESPONSE} from "../constants.js";

export const walletRoutes = async (request, response) => {
  if(request.method === "GET" && request.url === "/wallet") {
    await getWallet(request,response)
    return ROUTER_RESPONSE.HANDLED
  }
  return ROUTER_RESPONSE.NOT_FOUND
}