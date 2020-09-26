import React, { useState } from "react";
import { pageAtom, FragmentType } from "./atoms/page";
import { siteAtom } from "./atoms/site";

import { useAtom } from "jotai";
import { create_UUID } from "./util/uuid";
import { firebase } from "./firebase/firebase";
import { usePageId } from "./hooks/usePageId";
import { AddText } from "./processors/TextProcessor";
import { AddLink } from "./processors/LinkProcessor";
import { AddImage } from "./processors/ImageProcessor";
import Button from "@material-ui/core/Button";
import styles from "./AddContent.module.scss";
import { AddHeading } from "./processors/HeadingProcessor";

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
  const [addHeader, setAddHeader] = useState(false);
  const pageId = usePageId();

  function StoreContent(type: FragmentType, rest: any) {
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
    return <AddText storeContent={StoreContent} />;
  }

  if (addLink) {
    return <AddLink addStuff={StoreContent} />;
  }

  if (addImage) {
    return <AddImage addStuff={StoreContent} />;
  }

  if (addHeader) {
    return <AddHeading storeContent={StoreContent} />;
  }

  return (
    <div className={styles.addcontentbuttongroup}>
      <Button
        className={styles.addcontentbutton}
        variant="contained"
        color="primary"
        onClick={() => setAddText(true)}
      >
        Legg til tekst
      </Button>
      <Button
        className={styles.addcontentbutton}
        variant="contained"
        color="primary"
        onClick={() => setAddHeader(true)}
      >
        Legg til overskrift
      </Button>
      <Button
        className={styles.addcontentbutton}
        variant="contained"
        color="primary"
        onClick={() => setAddImage(true)}
      >
        Legg til bilde
      </Button>
      <Button
        className={styles.addcontentbutton}
        variant="contained"
        color="primary"
        onClick={() => setAddLink(true)}
      >
        Legg til lenke
      </Button>
    </div>
  );
};

interface AddContentProps {
  index: number;
}

export const AddContent = ({ index }: AddContentProps) => {
  const [page] = useAtom(pageAtom);
  const [showAddContent, setShowAddContent] = useState(false);

  if (!page.editMode) {
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
