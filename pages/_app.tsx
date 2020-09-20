import "../styles/globals.css";
import styles from "../styles/_app.module.css";

import { Provider, useAtom } from "jotai";
import { useEffect } from "react";
import { userAtom } from "../components/atoms/user";
import { firebase } from "../components/firebase/firebase";
import { pageAtom } from "../components/atoms/page";

function InsideProvider() {
  const [, setUser] = useAtom(userAtom);
  const [page] = useAtom(pageAtom);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
      if (user == null) {
        return;
      }
      const { uid } = user;
      setUser({
        uid,
        editMode: false,
        admin: page.admins.includes(uid),
      });
    });
  }, []);

  return null;
}

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <Provider>
      <InsideProvider />
      <div className={styles.wrapper}>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
