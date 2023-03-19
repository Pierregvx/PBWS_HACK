import { ethers } from "ethers";
import {
  getVerifyingPaymaster,
  getSimpleAccount,
  getGasFee,
  printOp,
  getHttpRpcClient,
  
} from "../aaUtils";

import { getAddress } from "ethers/lib/utils";
import baseconfig from "../aaUtils/baseconfig.json";
// @ts-ignore
export default async function main(
  tkn,
  config,
  abi,
  namefct,
  parameters:any[]
) {
  console.log("test")
  const withPM: boolean = true
  
  const provider = new ethers.providers.JsonRpcProvider(baseconfig.rpcUrl);
  const paymasterAPI = withPM
    ? getVerifyingPaymaster(baseconfig.paymasterUrl, baseconfig.entryPoint)
    : undefined;

  const accountAPI = getSimpleAccount(
    provider,
    baseconfig.signingKey,
    baseconfig.entryPoint,
    baseconfig.simpleAccountFactory,
    paymasterAPI
  );

  const token = ethers.utils.getAddress(tkn);
  console.log(`Token address: ${token}`)
  console.log(tkn)
  const erc20 = new ethers.Contract(token, abi, provider);
 
console.log([...parameters])

  const op = await accountAPI.createSignedUserOp({
    target: erc20.address,
    data: erc20.interface.encodeFunctionData(namefct, [...parameters]),
    ...(await getGasFee(provider)),
  });
  console.log(`Signed UserOperation: ${await printOp(op)}`);

  const client = await getHttpRpcClient(
    provider,
    baseconfig.bundlerUrl,
    baseconfig.entryPoint
  );
  const uoHash = await client.sendUserOpToBundler(op);
  console.log(`UserOpHash: ${uoHash}`);

  console.log("Waiting for transaction...");
  const txHash = await accountAPI.getUserOpReceipt(uoHash);
  console.log(`Transaction hash: ${txHash}`);
}
