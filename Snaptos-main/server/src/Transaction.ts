// /* eslint-disable */
// import { Account, Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

// type Request = {
//   sender: Account;
//   recipient: string;
//   amount: number;
// };

// /**
//  * Submit a transaction to the blockchain.
//  *
//  * @param request - request body.
//  * @returns { txnHash } - transaction hash.
//  */
// export async function doTransaction(request: Request) {
//   const aptos = new Aptos(new AptosConfig({ network: Network.DEVNET })); // Change network as needed
//   const { sender, recipient, amount } = request;

//   try {
//     console.log({ sender, recipient, amount });

//     // Create and sign transaction
//     const txn = await aptos.transferCoinTransaction({
//       sender: sender.accountAddress.toString(),
//       recipient,
//       amount,
//     });

//     // Submit transaction
//     const txnHash = await aptos.signAndSubmitTransaction({
//       signer: sender,
//       transaction: txn,
//     });

//     // Wait for transaction confirmation
//     await aptos.waitForTransaction({ transactionHash: txnHash.hash });

//     console.log('Transaction Successful:', txnHash);
//     return txnHash;
//   } catch (error) {
//     console.error('Transaction Error:', error);
//     throw new Error(`Transaction failed: ${error}`);
//   }
// }

import { Account, Aptos } from '@aptos-labs/ts-sdk';

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
  const aptos = new Aptos();
  const requestBody: Request = request;

  const { sender, recipient, amount } = requestBody;

  try {
    console.log({ sender, recipient, amount });
    const txn = await aptos.transferCoinTransaction({
      sender: sender.accountAddress.toString(),
      recipient,
      amount,
    });
    console.log('Transaction:', txn);
    return txn;
  } catch (error) {
    console.error('Error:', error);
  }
}