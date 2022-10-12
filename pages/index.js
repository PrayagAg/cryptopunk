import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Fragment, useEffect, useState } from "react";

function Profile() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (isConnected)
    return (
      <div>
        <h1 className={styles.title}>CryptoPunks</h1>
        Connected to {ensName ?? address}
        <button className={styles.card} onClick={() => disconnect()}>
          Disconnect
        </button>
        <Connected />
      </div>
    );
  return (
    <div>
      <button className={styles.card} onClick={() => connect()}>
        Connect Wallet
      </button>
    </div>
  );
}

function Connected() {
  return (
    <div className={styles.grid}>
      <a className={styles.card}>
        <p>
          Enter the cryptopunk id #
          <Cryptopunk />
        </p>
      </a>
    </div>
  );
}

function Cryptopunk() {
  const [formData, setFormData] = useState({
    name: "",
  });

  const { name } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="number"
            placeholder="#Id"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div className={styles.card}>
          <div>
            {name !== "" && name >= 0 && name <= 9999 ? (
              <img
                src={`https://cryptopunks.app/cryptopunks/cryptopunk${name}.png`}
                alt="cryptopunk"
                width={336}
                height={336}
              />
            ) : (
              "Please enter an id between 0 and 9999"
            )}
          </div>
        </div>
      </form>
    </Fragment>
  );
}

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Yuga Labs!</h1>

        <p className={styles.description}>
          <Profile />
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/PrayagAg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by
          <span className={styles.logo}>
            <Image src="/github.svg" alt="Github Logo" width={30} height={30} />
          </span>
        </a>
      </footer>
    </div>
  );
}
