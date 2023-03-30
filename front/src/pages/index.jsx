import { useState } from 'react';
import { getToken, getTokenGrids } from '@/lib/apolloClient';
import styles from '@/styles/Home.module.css';
import { Grid } from './components/grid';
import NavBar  from './components/NavBar';
import React from 'react';
import ethers from "ethers"
export default function Home({ tokens }) {

  const [selectedToken, setSelectedToken] = useState(null);
  const [grids, setGrids] = useState([]);
  const [amount, setAmount] = useState('');

  const balanceETHUser = async(user,provider) =>{
    return ethers.utils.formatEther(await provider.getBalance(user));

  }


  const handleTokenClick = async (token) => {
    setSelectedToken(token.id);
    const { grids } = await getTokenGrids(token.id);
    setGrids(grids);
  };

  const handleBuy = (token) => {
    console.log("Buying ${amount} ${token.name}");
  };

  const handleSell = (token) => {
    console.log("Selling ${amount} ${token.name}");
  };

  const handleToggle = (gridId) => {
    setGrids((prevGrids) =>
      prevGrids.map((grid) =>
        grid.id === gridId
          ? { ...grid, isOpen: !grid.isOpen }
          : grid
      )
    );
  };

  return (
    <div className={styles.container}>
      <NavBar/>
      <div className={styles.tokenList}>
        {tokens &&
          tokens.map((token) => (
            <button
              key={token.id}
              className={styles.tokenButton}
              onClick={() => handleTokenClick(token)}
            >
              {token.name}
            </button>
          ))}
      </div>

      <div className={styles.selectedToken}>
        <h1 className={styles.title}>Tokens</h1>

        {selectedToken && (
          <>
            <div className={styles.gridWrapper}>
              <h2 className={styles.subtitle}>
                Grids for {selectedToken.name}
              </h2>

              {grids.length === 0 ? (
                <p>Loading grids...</p>
              ) : (
                <ul className={styles.gridList}>
                  {grids.map((grid) => (
                    <li key={grid.id} className={styles.gridItem}>
                      <Grid
                        grid={grid}
                        amount={amount}
                        handleBuy={handleBuy}
                        handleSell={handleSell}
                        handleToggle={handleToggle}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const { tokens } = await getToken();

  return { props: { tokens } };
}