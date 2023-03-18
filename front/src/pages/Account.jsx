import { useState } from "react";
import NavBar from "./components/NavBar";
import styles from "@/styles/Account.module.css";
import {getAddressFromLogIn,isContractDeployed} from "../../scripts/address";
import {mint} from "../../scripts/mintNFT";
import { AppContext } from "@/lib/AppContext";
import { initWallet } from "../../scripts/init"
import React from "react";
export default function Account() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [adr, setAddress] = useState("");
  const [isDeployed, setIsDeployed] = useState(false);
  const { setConfig } = React.useContext(AppContext);

  const handleConnect = () => {
    setIsConnecting(true);
  };

  const handleCreateAccount = async () => {
    try {
      const accountAddress = await getAddressFromLogIn(email, password);
      const isDeployed = await isContractDeployed(accountAddress);
      setAddress(accountAddress);
      setIsDeployed(isDeployed);
    } catch (error) {
      console.log(error);
    }
  };


  const handleDeployAccount = async () => {
    //default provider
    await mint(email, adr, password).then(setIsDeployed(true));
  }

  async function getObjectFromDatabase(mail, password) {
    const user = await db.users.findOne({ mail, password });
    if (!user) {
      throw new Error("User not found");
    }

    // Assuming the user has a field called "objectId" which contains the ID of the object to access
    const object = await db.objects.findOne({ id: user.objectId });
    if (!object) {
      throw new Error("Object not found");
    }

    return object;
  }

  return (
    <div>
      <NavBar />

      <div className={styles.container}>
        <h1 className={styles.title}>Account</h1>

        <div className={styles.form}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />

          <>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
          </>
          
          <div className={styles.buttons}>
            <div>
 
              <button onClick={handleCreateAccount} className={styles.button}>
                Create account / Log in
              </button>
              {adr && (
                <div>
                  <p>Address from account: {adr}</p>
                  <p>Is contract deployed: {isDeployed ? "Yes" : "No"}</p>
                  {
                    !isDeployed  && adr&& (
                      
                      <button onClick={handleDeployAccount} className={styles.button} > Deploy contract & Get your NFT</button> 

                    )

                  }
                  {isDeployed && (
                    <button onClick={() =>{console.log("oi"); setConfig(initWallet())}} className={styles.button}> use this wallet</button>
                  )}
              
                </div>
                )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
