import { ethers } from "ethers"
import {ERC721_ABI} from "../aaUtils"
import { initWallet } from "./init"
import runTx from "./runTx"
const addressNFT = "0x3D4E355c6846d6BE4d20cfAa991681fa1695f420"
import getAddress from "./address"
import baseconfig from "../aaUtils/baseconfig.json";
export async function mint(user:string,adr:string,password:string){

    
const config = initWallet(user,password)
const abi = ["function mint(address to)"]
const addresse = await getAddress(baseconfig)

await runTx(addressNFT,config,abi,"mint",[ethers.utils.getAddress(addresse)]).then((txHash) => {console.log(txHash)})

}