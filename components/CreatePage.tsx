import { firebase } from "./firebase/firebase";
import { userAtom } from "./atoms/user";
import { useAtom } from "jotai";
import { Login } from "./login/Login";
import { PageAtomType } from "./atoms/page";
import { siteAtom } from "./atoms/site";
import { useState } from "react";
import Button from "@material-ui/core/Button";

interface Props {
  pageToBeCreated: string;
}

const CreatePageInfo = ({ pageToBeCreated }: Props) => {
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
      .doc(pageToBeCreated)
      .set({
        admins: [user.uid],
        title: site.collection,
        content: [],
        admin: true,
        editMode: false,
      } as PageAtomType);
  }

  return (
    <div>
      <h1>Opprett side</h1>
      <Button variant="contained" color="primary" onClick={create}>
        Opprett side
      </Button>
    </div>
  );
};

export function CreatePage(props: Props) {
  const [creating, setCreating] = useState(false);

  if (creating) {
    return <CreatePageInfo {...props} />;
  }

  return (
    <div>
      <h1>Opprett side</h1>
      <p>
        Denne siden finnes ikke enda. Har du lyst å opprette en ny side her?
      </p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setCreating(true)}
      >
        Opprett side
      </Button>
    </div>
  );
}
