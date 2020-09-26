import React from "react";
import { useAtom } from "jotai";
import { pageAtom } from "./atoms/page";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import { firebase } from "./firebase/firebase";

import styles from "./EditModeToggler.module.scss";
import { useIsAdmin } from "./hooks/useIsAdmin";
import { userAtom } from "./atoms/user";

export function EditModeToggler() {
  const [page, setPage] = useAtom(pageAtom);
  const [user] = useAtom(userAtom);
  const isAdmin = useIsAdmin();

  function edit() {
    setPage({
      ...page,
      editMode: true,
    });
  }

  function endEdit() {
    setPage({
      ...page,
      editMode: false,
    });
  }

  function logOut() {
    console.log("Logger ut");
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("Logged out success");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  if (user.uid === undefined) {
    return (
      <div className="actiongroup">
        <Link href="login">
          <Button variant="contained" color="primary">
            Logg inn
          </Button>
        </Link>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Button variant="contained" color="primary" onClick={logOut}>
        Logg ut
      </Button>
      {!page.editMode ? (
        <Button variant="contained" color="primary" onClick={edit}>
          Endre innhold
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={endEdit}>
          Avslutt innholdsredigering
        </Button>
      )}
    </div>
  );
}
