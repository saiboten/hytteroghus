import "../styles/globals.css";
import styles from "../styles/_app.module.css";

import { Provider, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { userAtom } from "../components/atoms/user";
import { firebase } from "../components/firebase/firebase";
import { siteAtom } from "../components/atoms/site";

function AuthChangeLoader({ children }: any) {
  const [, setUser] = useAtom(userAtom);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
      if (user == null) {
        setUserLoaded(true);
        return;
      }
      const { uid } = user;
      setUser({
        uid,
      });
      setUserLoaded(true);
    });
  }, []);

  if (userLoaded) {
    return <>{children}</>;
  }

  return <div>Laster bruker...</div>;
}

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <Provider>
      <AuthChangeLoader>
        <div className={styles.wrapper}>
          <Component {...pageProps} />
        </div>
      </AuthChangeLoader>
    </Provider>
  );
}

export default MyApp;
