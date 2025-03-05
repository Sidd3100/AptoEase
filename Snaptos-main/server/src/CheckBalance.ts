/* eslint-disable */
import { Aptos, AptosConfig, Network, GetAccountCoinsDataResponse } from "@aptos-labs/ts-sdk";

interface Request {
  address: string;
  network: string;
}

// Define an interface for the coin store resource
interface CoinStore {
  coin: {
    value: string;
  };
}

export default async function checkBalance(request: Request) {
  const requestBody: Request = request;
  const network = requestBody.network;

  // Validate and determine the network
  let aptosNetwork: Network;
  if (network === 'DEVNET') {
    aptosNetwork = Network.DEVNET;
  } else if (network === 'TESTNET') {
    aptosNetwork = Network.TESTNET;
  } else if (network === 'MAINNET') {
    aptosNetwork = Network.MAINNET;
  } else {
    throw new Error(`Unsupported network type: ${network}`);
  }

  // Create an Aptos client with the latest configuration
  const aptosConfig = new AptosConfig({ network: aptosNetwork });
    const aptos = new Aptos(aptosConfig);
    const accountCoinsData: GetAccountCoinsDataResponse = await aptos.getAccountCoinsData({accountAddress: request.address});
    console.log('this is accountCoinsData', accountCoinsData);
    console.log({requestBody})
    console.log('network: ', network)

    return accountCoinsData;
}