import React, { useState } from "react";
import { firebase } from "../firebase/firebase";
import { Button, TextField } from "@material-ui/core";
import Link from "next/link";

export const InternalLogin = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [peek, setPeek] = useState(false);

  function logIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitting(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(user, password)
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode) {
          setErrorMessage(
            `Klarte ikke å logge deg inn, beklager det. Feilkode: ${errorCode}`
          );
          console.log(errorMessage);
        }
      });
  }

  function togglePeek() {
    setPeek(!peek);
  }

  return (
    <form onSubmit={logIn}>
      <div className="inputgroup">
        <TextField
          style={{
            marginRight: "10px",
          }}
          id="username"
          label="Brukernavn"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Brukernavn"
        />

        <TextField
          label="Passord"
          id="password"
          type={peek ? "text" : "password"}
          placeholder="Passord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={togglePeek}
        >
          {peek ? "eye-off" : "eye"}
        </Button>
      </div>

      <Button variant="contained" color="primary" type="submit">
        Logg inn
      </Button>

      <div className="actiongroup">
        <Link href="/">
          <Button variant="contained" color="primary">
            Tilbake
          </Button>
        </Link>
      </div>
      <p>{errorMessage}</p>
    </form>
  );
};
