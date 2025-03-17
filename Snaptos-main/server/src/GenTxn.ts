/* eslint-disable */
// import { Aptos, AptosConfig, Network, Account, AccountAddress } from '@aptos-labs/ts-sdk';

// export async function genTxn(reqBody: {
//   to: string;
//   amount: number;
//   addr: Account;
// }) {
//   const aptos = new Aptos(new AptosConfig({ network: Network.DEVNET })); // Change network if needed
//   const { to, amount, addr } = reqBody;

//   try {
//     if (!addr || !addr.accountAddress) {
//       throw new Error("Invalid sender account: Missing account address.");
//     }

//     console.log("Sender Address:", addr.accountAddress.toString());
//     console.log("Transaction Details:", { to, amount });

//     // Build the transaction
//     const tx = await aptos.transaction.build.simple({
//       sender: addr.accountAddress,
//       data: {
//         function: '0x1::coin::transfer',
//         typeArguments: ['0x1::aptos_coin::AptosCoin'],
//         functionArguments: [to, amount],
//       },
//     });

//     // Sign and submit transaction
//     const txnResponse = await aptos.signAndSubmitTransaction({ signer: addr, transaction: tx });

//     // Extract transaction hash
//     const txnHash = txnResponse.hash;

//     // Wait for confirmation
//     await aptos.waitForTransaction({ transactionHash: txnHash });

//     console.log('Transaction successful:', txnHash);
//     return txnHash; // Return transaction hash to frontend
//   } catch (error) {
//     console.error('Transaction error:', error);
//     throw new Error(`Transaction failed: ${error}`);
//   }
// }
import { AccountAddress, Aptos } from '@aptos-labs/ts-sdk';

export async function genTxn(reqBody: {
  to: string;
  amount: number;
  addr: AccountAddress;
}) {
  const aptos = new Aptos();
  const { to, amount, addr } = reqBody;
  const tx = await aptos.transaction.build.simple({
    sender: addr,
    data: {
      function: '0x1::aptos_account::transfer_coins',
      typeArguments: ['0x1::aptos_coin::AptosCoin'],
      functionArguments: [to, amount],
    },
  });
  return tx;
} 
