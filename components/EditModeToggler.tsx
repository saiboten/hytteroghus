import React from "react";
import { useAtom } from "jotai";
import { pageAtom } from "./atoms/page";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import { firebase } from "./firebase/firebase";

import styles from "./EditModeToggler.module.scss";
import { useIsAdmin } from "./hooks/useIsAdmin";
import { userAtom } from "./atoms/user";
import { editingAtom } from "./atoms/editing";

export function EditModeToggler() {
  const [editing, setEditing] = useAtom(editingAtom);
  const [user] = useAtom(userAtom);
  const isAdmin = useIsAdmin();

  function edit() {
    setEditing(true);
  }

  function endEdit() {
    setEditing(false);
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
            Admin
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
      {!editing ? (
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
