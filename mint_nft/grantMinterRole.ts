import { getDefaultProvider, Wallet } from 'ethers'; // ethers v5
import { Provider, TransactionResponse } from '@ethersproject/providers'; // ethers v5
import { ERC721Client } from '@imtbl/contracts';

const CONTRACT_ADDRESS = '0x0206fd2a64fe5b09b12573cf90179151f7d5df21';
const PRIVATE_KEY = 'b01c17c488ae890d3be2080b44fc409d81b4b63d09ea716d2859512b2d3b2a95';
const provider = getDefaultProvider('https://rpc.testnet.immutable.com');

const grantMinterRole = async (
  provider: Provider
): Promise<TransactionResponse> => {
  // Bound contract instance
  const contract = new ERC721Client(CONTRACT_ADDRESS);
  // The wallet of the intended signer of the mint request
  const wallet = new Wallet(PRIVATE_KEY, provider);

  // Give the wallet minter role access
  const populatedTransaction = await contract.populateGrantMinterRole(
    wallet.address, {
  maxPriorityFeePerGas: 100e9,
  maxFeePerGas: 150e9
}
  );
  const result = await wallet.sendTransaction(populatedTransaction);
  return result;
};

grantMinterRole(provider);