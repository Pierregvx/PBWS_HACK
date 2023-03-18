import { getSimpleAccount } from "./getSimpleAccount";
import {ethers} from "ethers"
import { initWallet } from "./init";
// @ts-ignore

export async function isContractDeployed(address: string) {
  const provider = ethers.getDefaultProvider("goerli");
  const bytecode = await provider.getCode(address);
  return bytecode !== '0x';
}
export  async function getAddressFromLogIn(user:string, password:string) {
  const config = initWallet(user, password);
  const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);

  const accountAPI = getSimpleAccount(
    provider,
    config.signingKey,
    config.entryPoint,
    config.simpleAccountFactory
  );
  const address = await accountAPI.getCounterFactualAddress();
  
  console.log(`SimpleAccount address: ${address}`);
  return address;
}
export default async function getAddress(config){
  const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);

  const accountAPI = getSimpleAccount(
    provider,
    config.signingKey,
    config.entryPoint,
    config.simpleAccountFactory
  );
  const address = await accountAPI.getCounterFactualAddress();
  
  console.log(`SimpleAccount address: ${address}`);
  return address;
}
