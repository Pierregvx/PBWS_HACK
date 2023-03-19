import React from "react";
import Switch from "react-switch";
import styles from "../../styles/Grid.module.css";
import { ethers } from "ethers";
import { ERC20_ABI } from "../../../aaUtils/abi";
import { placeOrder } from "../../../scripts/placeOrder";
export function Grid({ grid, onToggle, onMakeOrder, onSwap }) {
  const [amount, setAmount] = React.useState("");
  const [isMakingOrder, setIsMakingOrder] = React.useState(true);
  const [balanceToken0, setBalanceToken0] = React.useState(null);
  const [balanceToken1, setBalanceToken1] = React.useState(null);
  const user = "0xf1BC68bc674d85187EE5699C9C7c578571dda6d0";
  const correctaddress = {
    WETH: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    CUSD: "0x519fbe8c8bE03167600B2C1203E617b62b100Ae1",
    aETH: "0x7C062fC77DE90E15b3bE172a2274b242561315fd",
    USDC: "0x23458bD252d00809ba969Ab8a88a06B8D5C8Fd25",
  };
  const correctGrid = {
    "0x36f8b40aac310d138acaf2f1514a70eeb7c0f004":"0x36f8b40aac310d138acaF2F1514A70EEb7c0F004",
    "0xafa7223e73387014fe0655a65eb8ac87c6510ad6":"0xAFA7223e73387014Fe0655A65EB8AC87c6510AD6",
    "0xbcd9d75df321dc1d532123bc81e290b59e27f4a3":"0xBCD9d75dF321Dc1D532123bc81e290B59e27f4a3"}


  React.useEffect(() => {
    const getBalances = async () => {
      console.log("\n\n\n\n\n\n\n\n",grid.token0)
      const balance0 = await balanceTokenUser(correctaddress[grid.token0.symbol]);
      const balance1 = await balanceTokenUser(correctaddress[grid.token1.symbol]);
      setBalanceToken0(balance0);
      setBalanceToken1(balance1);
    };
    getBalances();
  }, [grid.token0.id, grid.token1.id]);

  const balanceTokenUser = async (token) => {
    console.log(token);
    console.log(user)
    const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.public.blastapi.io");
    return token
      ? ethers.utils.formatEther(
          await new ethers.Contract(token, ERC20_ABI, provider).balanceOf(user)
        )
      : 0;
  };

 

  return (
    <li key={grid.id} className={styles.grid}>
      <div className={styles.amount}></div>
      <p>
        {grid.token0.name} : balance = {balanceToken0}{" "}
      </p>
      <p>
        {grid.token1.name} : balance = {balanceToken1}{" "}
      </p>

      <p>
        Price of {grid.token0.name}: {grid.price0.toString().slice(0, 9)}
      </p>

      <label>
        <input
          type="text"
          onChange={(e) => setAmount(e.target.value)}
          placeholder={`Amount in ${grid.token0.name}`}
        />
      </label>
      <div className={styles.buttons}>
        <label>
          <span>{isMakingOrder ? "Make Order" : "Swap"}</span>
          <Switch
            onChange={() => setIsMakingOrder((prev) => !prev)}
            checked={isMakingOrder}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={20}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={15}
            width={40}
            className={styles.switch}
            id="switch"
          />
        </label>
        <button onClick={()=> {}}>Buy {grid.token0.name}</button>

        <button onClick={async () => {
    await placeOrder(correctGrid[grid.id], "ui", "ez", "ez", grid.price0, grid.amount, false);
  }}>
    
    Sell {grid.token0.name}</button>
      </div>
    </li>
  );
}
