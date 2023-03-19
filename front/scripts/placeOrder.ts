import { ethers } from "ethers";
import {GRIDEX_ABI} from "../aaUtils";
import { initWallet } from "./init";
import runTx from "./runTx";
import getAddress from "./address";
import baseconfig from "../aaUtils/baseconfig.json";
import { defaultAbiCoder } from "@ethersproject/abi";

export async function placeOrder(ctr:string,user: string, adr: string, password: string,price:number,quantity:number,isZero:boolean) {
  // run runTx(addressNFT,true,ERC721_ABI) then return the txHash
  // console.log("user",user,"adr",adr,"password",password)
  // const price_bigNumber = ethers.utils.parseEther("1000");
  const config = initWallet(user, password);
  const adr2 =  await getAddress(baseconfig);
  
  const parameters = {
    recipient: adr2,
    zero:isZero,
    boundaryLower:-20,
    amount:ethers.utils.parseEther("0.05"),
  }
  console.log(parameters)

  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // await provider.send('eth_requestAccounts', []); // <- this promps user to connect metamask
  // const signer = provider.getSigner();
  // let contract = new ethers.Contract(adr2,GRIDEX_ABI,provider)
  // await contract.connect(signer).placeMakerOrder(parameters,"0x01",{ gasLimit:1000000 }).then((txHash) => {console.log(txHash);});
    
  try{
  await runTx(ctr, baseconfig, GRIDEX_ABI, "placeMakerOrder", [parameters,"0x01"]).then((txHash) => {
    console.log(txHash);
  });}
  catch(e){
    console.log("errr while placing order",e)
  }
}
