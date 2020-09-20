import React from "react";
import { firebase } from "./firebase/firebase";
import { useAtom } from "jotai";
import { pageAtom } from "./atoms/page";
import { usePageId } from "./hooks/usePageId";
import { userAtom } from "./atoms/user";
import { siteAtom } from "./atoms/site";

interface Props {
  index: number;
}

export const DeleteContent = ({ index }: Props) => {
  const [page] = useAtom(pageAtom);
  const [site] = useAtom(siteAtom);
  const [user] = useAtom(userAtom);
  const pageId = usePageId();

  if (!user.editMode) {
    return null;
  }

  function deleteContent() {
    const contentCopy = [...page.content];
    contentCopy.splice(index, 1);

    firebase.firestore().collection(site.collection).doc(pageId).update({
      content: contentCopy,
    });
  }

  return <button onClick={deleteContent}>Slett innhold</button>;
};
