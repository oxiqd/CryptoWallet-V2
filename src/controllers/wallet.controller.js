import {walletGetService} from "../services/wallet.service.js";


export const getWallet = (request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');

  const wallet = walletGetService()

  response.end(
    JSON.stringify({
      data:wallet
    })
  )
}