import React, { useState } from "react";
import { pageAtom, FragmentType } from "./atoms/page";
import { siteAtom } from "./atoms/site";

import { useAtom } from "jotai";
import { userAtom } from "./atoms/user";
import { create_UUID } from "./util/uuid";
import { firebase } from "./firebase/firebase";
import { usePageId } from "./hooks/usePageId";
import { AddText } from "./processors/TextProcessor";
import { AddLink } from "./processors/LinkProcessor";
import { AddImage } from "./processors/ImageProcessor";

import styles from "./AddContent.module.css";

interface WithShowAddContent {
  index: number;
  resetAdd: () => void;
}

const WithShowAddContent = ({ index, resetAdd }: WithShowAddContent) => {
  const [page] = useAtom(pageAtom);
  const [site] = useAtom(siteAtom);
  const [addText, setAddText] = useState(false);
  const [addLink, setAddLink] = useState(false);
  const [addImage, setAddImage] = useState(false);
  const pageId = usePageId();

  function AddStuff(type: FragmentType, rest: any) {
    const contentCopy = [...page.content];

    if (index == -1) {
      contentCopy.unshift({
        type: type,
        id: create_UUID(),
        ...rest,
      });
    } else {
      contentCopy.splice(index + 1, 0, {
        type,
        id: create_UUID(),
        ...rest,
      });
    }

    firebase.firestore().collection(site.collection).doc(pageId).update({
      content: contentCopy,
    });
    resetAdd();
  }

  if (addText) {
    return <AddText addStuff={AddStuff} />;
  }

  if (addLink) {
    return <AddLink addStuff={AddStuff} />;
  }

  if (addImage) {
    return <AddImage addStuff={AddStuff} />;
  }

  return (
    <div>
      <ul>
        <li>
          <button onClick={() => setAddText(true)}>Legg til tekst</button>
        </li>
        <li>
          <button onClick={() => setAddImage(true)}>Legg til bilde</button>
        </li>
        <li>
          <button onClick={() => setAddLink(true)}>Legg til lenke</button>
        </li>
      </ul>
    </div>
  );
};

interface AddContentProps {
  index: number;
}

export const AddContent = ({ index }: AddContentProps) => {
  const [user] = useAtom(userAtom);
  const [showAddContent, setShowAddContent] = useState(false);

  if (!user.editMode) {
    return null;
  }

  if (showAddContent) {
    return (
      <WithShowAddContent
        resetAdd={() => setShowAddContent(false)}
        index={index}
      />
    );
  }

  return (
    <button className={styles.button} onClick={() => setShowAddContent(true)}>
      Legg til innhold her
    </button>
  );
};
