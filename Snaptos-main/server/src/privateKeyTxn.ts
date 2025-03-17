// /* eslint-disable */
// import { Account, Aptos, AptosConfig, Ed25519PrivateKey, Network } from '@aptos-labs/ts-sdk';
// import CryptoJS from 'crypto-js';

// type Request = {
//   pk: string;
//   recipient: string;
//   amount: number;
//   network: string;
//   encryptionKey: string;
// };

// function decryptPhrase(encryptedPhrase: string, encryptionKey: string): string {
//   const bytes = CryptoJS.AES.decrypt(encryptedPhrase, encryptionKey);
//   const originalText = bytes.toString(CryptoJS.enc.Utf8);
//   if (!originalText) throw new Error("Decryption failed: Invalid key or corrupted data.");
//   return originalText;
// }

// function padHexString(input: string): string {
//   let hexString = input.startsWith('0x') ? input.slice(2) : input;
//   const length = 64;
//   while (hexString.length < length) {
//     hexString = '0' + hexString;
//   }
//   return '0x' + hexString;
// }

// export async function privateKeyTxn(request: Request) {
//   const { pk, recipient, amount, network, encryptionKey } = request;

//   try {
//     let aptosNetwork: Network;
//     if (network === 'DEVNET') {
//       aptosNetwork = Network.DEVNET;
//     } else if (network === 'TESTNET') {
//       aptosNetwork = Network.TESTNET;
//     } else if (network === 'MAINNET') {
//       aptosNetwork = Network.MAINNET;
//     } else {
//       throw new Error(`Unsupported network type: ${network}`);
//     }

//     const aptosConfig = new AptosConfig({ network: aptosNetwork });
//     const aptos = new Aptos(aptosConfig);

//     console.log({ pk, recipient, amount });

//     // Decrypt private key securely
//     const decryptedKey: string = decryptPhrase(pk, encryptionKey);
//     console.log('Decrypted Private Key:', decryptedKey);

//     // Ensure private key is correctly formatted
//     const formattedKey = padHexString(decryptedKey);
//     const privateKey = new Ed25519PrivateKey(formattedKey);
//     const account = Account.fromPrivateKey({ privateKey });

//     // Ensure recipient address is valid
//     const formattedRecipient = padHexString(recipient);

//     // Build transaction
//     const txn = await aptos.transferCoinTransaction({
//       sender: account.accountAddress,
//       recipient: formattedRecipient,
//       amount,
//     });

//     // Sign and submit transaction
//     const txnResponse = await aptos.signAndSubmitTransaction({
//       signer: account,
//       transaction: txn,
//     });

//     console.log("Transaction Response:", txnResponse);
//     return txnResponse;
//   } catch (error) {
//     console.error("Error in transaction:", error);
//     return { error: error.message };
//   }
// }

/* eslint-disable */
import { Account, Aptos, AptosConfig, Ed25519PrivateKey, Network } from '@aptos-labs/ts-sdk';
import CryptoJS from 'crypto-js';

type Request = {
  pk: string;
  recipient: string;
  amount: number;
  network: string;
};

function decryptPhrase(encryptedPhrase: string, key: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedPhrase, key);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}

function padHexString(input: string): string {
  let hexString = input.startsWith('0x') ? input.slice(2) : input;
  const length = 64;
  while (hexString.length < length) {
    hexString = '0' + hexString;
  }
  return '0x' + hexString;
}

export async function privateKeyTxn(request: Request) {
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
  const { recipient, pk, amount } = requestBody;
  const key = 'key';
  console.log({ pk, recipient, amount });
  const decryptedKey: string = decryptPhrase(pk, key);
  console.log('Decrypted Text:', decryptedKey);

  const privateKey = new Ed25519PrivateKey(decryptedKey);
  const account = Account.fromPrivateKey({ privateKey });

  const txn = await aptos.transferCoinTransaction({
    sender: account.accountAddress,
    recipient: padHexString(recipient),
    amount,
  });
  const txn1 = await aptos.signAndSubmitTransaction({
    signer: account,
    transaction: txn,
  });
  console.log(txn1);
  return txn1;
}