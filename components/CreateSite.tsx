import React from "react";
import { userAtom } from "./atoms/user";
import { useAtom } from "jotai";
import { Login } from "./login/Login";
import { Button } from "@material-ui/core";
import { siteAtom } from "./atoms/site";
import { firebase } from "../components/firebase/firebase";

export function CreateSite() {
  const [user] = useAtom(userAtom);
  const [site, setSite] = useAtom(siteAtom);

  function CreatePage() {
    firebase
      .firestore()
      .collection("config")
      .doc(site.collection)
      .set({
        admins: [user.uid],
      });
    setSite({
      ...site,
      collection: site.collection,
      admins: [user.uid || "BUG"],
    });
  }

  if (!user.uid) {
    return <Login />;
  }

  return (
    <div>
      Denne siden finnes ikke enda. Men det kan den gjøre snart. Bare klikk
      opprett side, og du er admin på siden!
      <Button variant="contained" color="primary" onClick={CreatePage}>
        Opprett side
      </Button>
    </div>
  );
}
