/* eslint-disable */
import { Account, Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

type Request = {
  sender: Account;
  recipient: string;
  amount: number;
};

/**
 * Submit a transaction to the blockchain.
 *
 * @param request - request body.
 * @returns { txn } - transaction hash.
 */
export async function doTransaction(request: Request) {
  const aptos = new Aptos(new AptosConfig({ network: Network.DEVNET })); // Change network as needed
  const requestBody: Request = request;
  const { sender, recipient, amount } = requestBody

  try {
    console.log({ sender, recipient, amount });

    // Create transaction
    const txn = await aptos.transferCoinTransaction({
      sender: sender.accountAddress.toString(),
      recipient,
      amount,
    });

    // Sign and submit transaction
    
    console.log('Transaction:', txn);
    return txn;
  } catch (error) {
    console.error('Error:', error);
    throw new Error(`Transaction failed: ${error}`);
  }
}
