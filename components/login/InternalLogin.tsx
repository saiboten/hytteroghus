import React, { useState } from "react";
import { firebase } from "../firebase/firebase";

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
          setErrorMessage("Klarte ikke å logge deg inn, beklager det.");
        }
      });
  }

  function togglePeek() {
    setPeek(!peek);
  }

  return (
    <form onSubmit={logIn}>
      <label htmlFor="username" className="screen-reader-only">
        Brukernavn
      </label>
      <input
        id="username"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Brukernavn"
      />

      <div>
        <label htmlFor="password" className="screen-reader-only">
          Passord
        </label>
        <input
          id="password"
          type={peek ? "text" : "password"}
          placeholder="Passord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={togglePeek}>
          {peek ? "eye-off" : "eye"}
        </button>
      </div>

      <button type="submit">Logg inn</button>
      <p>{errorMessage}</p>
    </form>
  );
};
