import { firebase } from "./firebase/firebase";
import { userAtom } from "./atoms/user";
import { useAtom } from "jotai";
import { Login } from "./login/Login";
import { PageAtomType } from "./atoms/page";
import { siteAtom } from "./atoms/site";
import { useState } from "react";

const CreatePageInfo = () => {
  const [site] = useAtom(siteAtom);
  const [user] = useAtom(userAtom);

  if (!user.uid) {
    return (
      <>
        <p>Før du kan opprette en side må du logge inn.</p>
        <Login />
      </>
    );
  }

  function create() {
    firebase
      .firestore()
      .collection(site.collection)
      .doc("home")
      .set({
        admins: [user.uid],
        title: site.collection,
        content: [],
      } as PageAtomType);
  }

  return (
    <div>
      <h1>Opprett side</h1>
      <button onClick={create}>Opprett side</button>
    </div>
  );
};

export function CreatePage() {
  const [creating, setCreating] = useState(false);

  if (creating) {
    return <CreatePageInfo />;
  }

  return (
    <div>
      <h1>Opprett side</h1>
      <p>
        Denne siden finnes ikke enda. Har du lyst å opprette en ny side her?
      </p>
      <button onClick={() => setCreating(true)}>Opprett side</button>
    </div>
  );
}
