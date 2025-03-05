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
  const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET })); // Change network as needed
  const { sender, recipient, amount } = request;

  try {
    console.log({ sender, recipient, amount });

    // Create transaction
    const txn = await aptos.transferCoinTransaction({
      sender: sender.accountAddress.toString(),
      recipient,
      amount,
    });

    // Sign and submit transaction
    const signedTxn = await aptos.signAndSubmitTransaction({
      signer: sender,
      transaction: txn,
    });

    console.log('Transaction:', signedTxn);
    return signedTxn;
  } catch (error) {
    console.error('Error:', error);
    throw new Error(`Transaction failed: ${error}`);
  }
}
