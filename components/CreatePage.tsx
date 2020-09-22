import { firebase } from "./firebase/firebase";
import { userAtom } from "./atoms/user";
import { useAtom } from "jotai";
import { Login } from "./login/Login";
import { PageAtomType, pageAtom } from "./atoms/page";
import { siteAtom } from "./atoms/site";
import Button from "@material-ui/core/Button";

interface Props {
  pageToBeCreated: string;
}

const CreatePageInfo = ({ pageToBeCreated }: Props) => {
  const [site] = useAtom(siteAtom);
  const [, setPage] = useAtom(pageAtom);
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
        title: site.collection,
        content: [],
        editMode: false,
      } as PageAtomType);
    setPage({
      title: site.collection,
      content: [],
      editMode: true,
    });
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={create}>
        Opprett side
      </Button>
    </div>
  );
};

export function CreatePage(props: Props) {
  return (
    <div>
      <h1>Opprett side</h1>
      <p>
        Denne siden finnes ikke enda. Har du lyst å opprette en ny side her?
      </p>

      <CreatePageInfo {...props} />
    </div>
  );
}
