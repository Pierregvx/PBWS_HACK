import Link from "next/link";
import styles from "@/styles/NavBar.module.css";
import { useContext } from "react";
import { AppContext } from "@/lib/AppContext";
import getAddress from "../../../scripts/address";
import React from "react";

export default function NavBar() {
  const { config, setConfig } = React.useContext(AppContext);
  const [accountAddress, setAccountAddress] = React.useState("");
  
  React.useEffect(() => {
    const getAccountAddress = async () => {
      const addressValue = config ? await getAddress(config) : "";
      setAccountAddress(addressValue);
    };
    getAccountAddress();
  }, [config]);

  return (
    <nav className={styles.nav}>
      <p>'using account : {accountAddress}'</p>
      <div className={styles.icon}>
        <Link href="/">
          <span>Dex Page</span>
        </Link>
      </div>
      <div className={styles.icon}>
        <Link href="/Account">
          <span>Account</span>
        </Link>
      </div>
    </nav>
  );
}
