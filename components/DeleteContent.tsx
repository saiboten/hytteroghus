import React from "react";
import { firebase } from "./firebase/firebase";
import { useAtom } from "jotai";
import { pageAtom } from "./atoms/page";
import { usePageId } from "./hooks/usePageId";
import { siteAtom } from "./atoms/site";
import Button from "@material-ui/core/Button";
import { editingAtom } from "./atoms/editing";

interface Props {
  index: number;
}

export const DeleteContent = ({ index }: Props) => {
  const [page] = useAtom(pageAtom);
  const [editing] = useAtom(editingAtom);
  const [site] = useAtom(siteAtom);
  const pageId = usePageId();

  if (!editing) {
    return null;
  }

  function deleteContent() {
    const contentCopy = [...page.content];
    contentCopy.splice(index, 1);

    firebase.firestore().collection(site.collection).doc(pageId).update({
      content: contentCopy,
    });
  }

  return (
    <Button variant="contained" color="primary" onClick={deleteContent}>
      Slett innhold
    </Button>
  );
};
