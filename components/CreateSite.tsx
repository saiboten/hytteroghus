import React from "react";
import { userAtom } from "./atoms/user";
import { useAtom } from "jotai";
import { Login } from "./login/Login";
import { Button } from "@material-ui/core";

export function CreateSite() {
  const [user] = useAtom(userAtom);

  function CreatePage() {
    console.log("created");
  }

  if (user.uid === "") {
    return <Login />;
  }

  return (
    <div>
      På tide å opprette denne siden!
      <Button variant="contained" color="primary" onClick={CreatePage}>
        Opprett side
      </Button>
    </div>
  );
}
