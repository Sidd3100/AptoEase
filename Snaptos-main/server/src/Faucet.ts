/* eslint-disable */
import { AptosConfig, Aptos, Network } from "@aptos-labs/ts-sdk";

type Request = {
  address: string;
  network: string;
};

export async function fundMe(request: Request) {
  const { address, network } = request;

  let aptosNetwork: Network;
  if (network === "DEVNET") {
    aptosNetwork = Network.DEVNET;
  } else if (network === "TESTNET") {
    aptosNetwork = Network.TESTNET;
  } else if (network === "MAINNET") {
    aptosNetwork = Network.MAINNET;
  } else {
    throw new Error(`Unsupported network type: ${network}`);
  }

  // Ensure the address is valid
  if (!/^0x[0-9a-fA-F]+$/.test(address)) {
    throw new Error("Invalid Aptos account address.");
  }

  const aptosConfig = new AptosConfig({ network: aptosNetwork });
  const aptos = new Aptos(aptosConfig);

  console.log("Request body:", request);
  console.log("Address type:", typeof address);

  try {
    // Fund the account with 100 APT (100_000_000 Octas)
    const txn = await aptos.fundAccount({
      accountAddress: address,
      amount: 100_000_000, // 100 APT
    });
    console.log("Transaction response:", txn);
    return txn;
  } catch (error) {
    console.error("Error funding account:", error);
    return { error: error.message };
  }
}
