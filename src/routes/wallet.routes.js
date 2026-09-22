import {getWallet} from "../controllers/wallet.controller.js";

export const walletRoutes = (request, response) => {
  if(request.method === "GET" && request.url === "/wallet") {
    getWallet(request,response)
    return true
  }
  return false
}