/* eslint-disable */
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

type Request = {
  hash: string;
  network: string;
};

export async function getTransByHash({ hash, network }: Request) {
  // Determine the Aptos network based on the provided network string.
  let aptosNetwork: Network;
  switch (network) {
    case 'DEVNET':
      aptosNetwork = Network.DEVNET;
      break;
    case 'TESTNET':
      aptosNetwork = Network.TESTNET;
      break;
    case 'MAINNET':
      aptosNetwork = Network.MAINNET;
      break;
    default:
      throw new Error(`Unsupported network type: ${network}`);
  }

  // Create an Aptos client with the proper configuration.
  const aptosConfig = new AptosConfig({ network: aptosNetwork });
  const aptos = new Aptos(aptosConfig);

  // Fetch the transaction details using the provided hash.
  const txn = await aptos.getTransactionByHash({ transactionHash: hash });
  console.log('Transaction details:', txn);

  return txn;
}
