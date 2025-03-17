// /* eslint-disable */
// import { Aptos, AptosConfig, Network, TransactionResponse } from "@aptos-labs/ts-sdk";

// type Request = {
//   address: string;
//   network: string;
// };

// export async function getTxn({ address, network }: Request): Promise<TransactionResponse[]> {
//   // Determine the Aptos network based on the provided network string.
//   let aptosNetwork: Network;
//   switch (network) {
//     case 'DEVNET':
//       aptosNetwork = Network.DEVNET;
//       break;
//     case 'TESTNET':
//       aptosNetwork = Network.TESTNET;
//       break;
//     case 'MAINNET':
//       aptosNetwork = Network.MAINNET;
//       break;
//     default:
//       throw new Error(`Unsupported network type: ${network}`);
//   }

//   // Create an Aptos client using the specified network configuration.
//   const aptosConfig = new AptosConfig({ network: aptosNetwork });
//   const aptos = new Aptos(aptosConfig);

//   // Retrieve the account's transaction history.
//   const txnHistory: TransactionResponse[] = await aptos.getAccountTransactions({ accountAddress: address });
//   console.log("Transaction History:", txnHistory);

//   return txnHistory;
// }
/* eslint-disable */
import { Aptos, AptosConfig, Network, TransactionResponse } from "@aptos-labs/ts-sdk";

type Request = {
    address: string;
    network: string;
}

export async function getTxn(request:Request) {

    const requestBody: Request = request;
    const networkType = requestBody.network;
  
    let APTOS_NETWORK: Network;
  
    if (networkType === 'DEVNET') {
      APTOS_NETWORK = Network.DEVNET;
    } else if (networkType === 'TESTNET') {
      APTOS_NETWORK = Network.TESTNET;
    } else if (networkType === 'MAINNET') {
      APTOS_NETWORK = Network.MAINNET;
    }
    
    const aptosConfig = new AptosConfig({ network: APTOS_NETWORK });
    const aptos = new Aptos(aptosConfig);
    const txnHistory : TransactionResponse[] = await aptos.getAccountTransactions({accountAddress: request.address});
    console.log('this is txnHis', txnHistory);

    return txnHistory;
    
}