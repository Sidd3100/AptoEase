/* eslint-disable */
import { Account, Aptos, AptosConfig, Ed25519PrivateKey, Network } from '@aptos-labs/ts-sdk';
import CryptoJS from 'crypto-js';

type Request = {
  pk: string;
  recipient: string;
  amount: number;
  network: string;
  encryptionKey: string;
};

function decryptPhrase(encryptedPhrase: string, encryptionKey: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedPhrase, encryptionKey);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  if (!originalText) throw new Error("Decryption failed: Invalid key or corrupted data.");
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
  const { pk, recipient, amount, network, encryptionKey } = request;

  try {
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

    const aptosConfig = new AptosConfig({ network: aptosNetwork });
    const aptos = new Aptos(aptosConfig);

    console.log({ pk, recipient, amount });

    // Decrypt private key securely
    const decryptedKey: string = decryptPhrase(pk, encryptionKey);
    console.log('Decrypted Private Key:', decryptedKey);

    // Ensure private key is correctly formatted
    const formattedKey = padHexString(decryptedKey);
    const privateKey = new Ed25519PrivateKey(formattedKey);
    const account = Account.fromPrivateKey({ privateKey });

    // Ensure recipient address is valid
    const formattedRecipient = padHexString(recipient);

    // Build transaction
    const txn = await aptos.transferCoinTransaction({
      sender: account.accountAddress,
      recipient: formattedRecipient,
      amount,
    });

    // Sign and submit transaction
    const txnResponse = await aptos.signAndSubmitTransaction({
      signer: account,
      transaction: txn,
    });

    console.log("Transaction Response:", txnResponse);
    return txnResponse;
  } catch (error) {
    console.error("Error in transaction:", error);
    return { error: error.message };
  }
}
