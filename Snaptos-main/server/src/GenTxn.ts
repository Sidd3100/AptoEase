/* eslint-disable */
import { Aptos, AptosConfig, Network, AccountAddress } from '@aptos-labs/ts-sdk';

export async function genTxn(reqBody: {
  to: string;
  amount: number;
  addr: AccountAddress;
}) {
  const aptos = new Aptos(new AptosConfig({ network: Network.DEVNET })); // Change network if needed
  const { to, amount, addr } = reqBody;

  // Convert recipient address to AccountAddress type
  const recipient = AccountAddress.fromString(to);

  // Use the simple transaction builder available under `aptos.transaction.build`
  const tx = await aptos.transaction.build.simple({
    sender: addr,
    data: {
      function: '0x1::coin::transfer',
      typeArguments: ['0x1::aptos_coin::AptosCoin'],
      functionArguments: [to, amount],
    },
  });

  return tx;
}
