import React, { useState } from "react";
import { FragmentType } from "./atoms/page";

import { useAtom } from "jotai";
import { AddText } from "./processors/TextProcessor";
import { AddLink } from "./processors/LinkProcessor";
import { AddImage } from "./processors/Image/ImageProcessor";
import Button from "@material-ui/core/Button";
import styles from "./AddContent.module.scss";
import { AddHeading } from "./processors/HeadingProcessor";
import { editingAtom } from "./atoms/editing";

interface WithShowAddContent extends AddContentProps {
  resetAdd: () => void;
}

const WithShowAddContent = ({ store }: WithShowAddContent) => {
  const [addText, setAddText] = useState(false);
  const [addLink, setAddLink] = useState(false);
  const [addImage, setAddImage] = useState(false);
  const [addHeader, setAddHeader] = useState(false);

  if (addText) {
    return <AddText storeContent={store} />;
  }

  if (addLink) {
    return <AddLink addStuff={store} />;
  }

  if (addImage) {
    return <AddImage addStuff={store} />;
  }

  if (addHeader) {
    return <AddHeading storeContent={store} />;
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
  store: (type: FragmentType, rest: any) => void;
}

export const AddContent = ({ store }: AddContentProps) => {
  const [editing] = useAtom(editingAtom);
  const [showAddContent, setShowAddContent] = useState(false);

  if (!editing) {
    return null;
  }

  if (showAddContent) {
    return (
      <WithShowAddContent
        store={(type, data) => {
          setShowAddContent(false);
          store(type, data);
        }}
        resetAdd={() => setShowAddContent(false)}
      />
    );
  }

  return (
    <button className={styles.button} onClick={() => setShowAddContent(true)}>
      Legg til innhold her
    </button>
  );
};
