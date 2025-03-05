/* eslint-disable */
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

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
  const { address, network } = request;

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

  // Define the resource type for the Aptos coin store
  const APTOS_COIN = "0x1::aptos_coin::AptosCoin";
  const COIN_STORE = `0x1::coin::CoinStore<${APTOS_COIN}>`;

  // Query the account resource for the coin store data
  const coinStore: CoinStore = await aptos.getAccountResource<CoinStore>({
    accountAddress: address,
    resourceType: COIN_STORE,
  });

  console.log("Coin store data:", coinStore);
  console.log("Request:", request);

  // Optionally parse the balance to a number for easier use
  const balance = Number(coinStore.coin.value);
  console.log("Balance:", balance);

  return coinStore;
}