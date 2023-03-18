import { useState } from 'react';
import Switch from 'react-switch';
import styles from "../../styles/Grid.module.css";

export function Grid({ grid, onToggle, onMakeOrder, onSwap }) {
  const [amount, setAmount] = useState("");
  const [isMakingOrder, setIsMakingOrder] = useState(true);

  const handleMakeOrderOrSwap = () => {
    if (isMakingOrder) {
      onMakeOrder(grid.token0);
    } else {
      onSwap(grid.token0, grid.token1);
    }
  };

  return (
    <li key={grid.id} className={styles.grid}>
      <div className={styles.amount}>
        
      </div>
      <p>Token 0: {grid.token0.name}</p>
      <p>Token 1: {grid.token1.name}</p>

      <p>Price of {grid.token0.name}: {grid.price0.toString().slice(0, 9)}</p>
     
<label>
         
          <input type="text" onChange={(e) => setAmount(e.target.value)} placeholder= {`Amount in ${grid.token0.name}`}/>
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
        <button onClick={handleMakeOrderOrSwap}>
            "Buy {grid.token0.name}"
            {/* {isMakingOrder ? `Buy ${grid.token0.name}` : `Swap ${grid.token0.name} for ${grid.token1.name}`} */}
          </button>
          <button onClick={handleMakeOrderOrSwap}>
            "Sell {grid.token0.name}"
            {/* {isMakingOrder ? `Buy ${grid.token0.name}` : `Swap ${grid.token0.name} for ${grid.token1.name}`} */}
          </button>
      </div>
    </li>
  );
}


