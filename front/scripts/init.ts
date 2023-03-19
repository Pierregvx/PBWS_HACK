import path from "path";
import prettier from "prettier";
import { ethers } from "ethers";
import { writeFile } from "fs";
import fs from "fs/promises";

export const initWallet = (iden: string, password: string) => {
  let utf8Encode = new TextEncoder();
  const user = new ethers.Wallet(ethers.utils.keccak256(ethers.utils.keccak256(utf8Encode.encode(iden+password+"salt"))))

  const cfg =  {
    bundlerUrl:
      "https://node.stackup.sh/v1/rpc/846ec6ccad42fd1b19c9e00c152840e11b9690a76fc8175e7ea4ead130758c37",
    rpcUrl: "https://node.stackup.sh/v1/rpc/846ec6ccad42fd1b19c9e00c152840e11b9690a76fc8175e7ea4ead130758c37",
    signingKey: user.privateKey,
    entryPoint: "0x0576a174D229E3cFA37253523E645A78A0C91B57",
    simpleAccountFactory: "0x71D63edCdA95C61D6235552b5Bc74E32d8e2527B",
    paymasterUrl: "https://app.stackup.sh/api/v2/paymaster/payg/846ec6ccad42fd1b19c9e00c152840e11b9690a76fc8175e7ea4ead130758c37",
  };
  console.log("config at init",cfg)
  return cfg;
};



