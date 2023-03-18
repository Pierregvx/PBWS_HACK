import { ethers } from "ethers"
import {ERC721_ABI} from "../aaUtils"
import { initWallet } from "./init"
import runTx from "./runTx"
const addressNFT = "0x06f275e0cfc2a5a68722d657888012b8fc67a3b2"
export async function mint(user:string,adr:string,password:string){
// run runTx(addressNFT,true,ERC721_ABI) then return the txHash
console.log("user",user,"adr",adr,"password",password)
const config = initWallet(user,password)
console.log(config)
// const provider = new ethers.providers.Web3Provider(window.ethereum);
// await provider.send('eth_requestAccounts', []); // <- this promps user to connect metamask
// const signer = provider.getSigner();
// let nft = new ethers.Contract(addressNFT,ERC721_ABI,provider)
// await nft.connect(signer).mint()
await runTx(addressNFT,config).then((txHash) => {console.log(txHash)})

}