/* eslint-disable */
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

type Request = {
  address: string;
  amt: number;
  network: string;
};

/**
 * Funds an account on the Aptos protocol using the Aptos SDK.
 * @param request The request body containing the account address, amount, and network.
 * @returns The transaction response.
 * @throws {Error} If the account could not be funded.
 */
export async function createAccount(request: Request) {
  const { address, amt, network } = request;

  let aptosNetwork: Network;

  if (network === 'DEVNET') {
    aptosNetwork = Network.DEVNET;
  } else if (network === 'TESTNET') {
    aptosNetwork = Network.TESTNET;
  } else {
    throw new Error(`Unsupported network type: ${network}`);
  }

  // Create an Aptos client with the latest configuration
  const aptosConfig = new AptosConfig({ network: aptosNetwork });
  const aptos = new Aptos(aptosConfig);

  console.log('Request body:', request);

  // Ensure the amount is within a reasonable range
  ; // Limit to 1M for testing

  try {
    // Fund the account using the Aptos SDK
    const txn = await aptos.fundAccount({
      accountAddress: address,
      amount: amt,
    });

    console.log('Funding Response:', txn);
    return txn;
  } catch (error) {
    console.error('Error funding account:', error);
    throw new Error(`Error funding account: ${error}`);
  }
}
