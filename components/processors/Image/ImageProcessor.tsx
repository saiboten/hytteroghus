import React, { useState, useCallback } from "react";
import { FragmentType } from "../../atoms/page";
import Button from "@material-ui/core/Button";
import { DropZone } from "./DropZone";
import { firebase } from "../../firebase/firebase";
import { siteAtom } from "../../atoms/site";
import { useAtom } from "jotai";
import { usePageId } from "../../hooks/usePageId";
import { create_UUID } from "../../util/uuid";

import styles from "./ImageProcessor.module.scss";

interface Props {
  value: string;
  index: number;
  saveChange: (index: number, values: any) => void;
}

interface AddProps {
  addStuff: (type: FragmentType, ...data: any[]) => void;
}

export const AddImage = (props: AddProps) => {
  const [site] = useAtom(siteAtom);
  const [downloadUrl, setDownloadUrl] = useState("");
  const pageId = usePageId();

  const storeImageToStorage = (image: string) => {
    try {
      // Store file
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const imageRef = storageRef
        .child(site.collection)
        .child(pageId)
        .child(create_UUID());

      imageRef.putString(image, "data_url").then(() => {
        imageRef.getDownloadURL().then((theDownloadUrl) => {
          setDownloadUrl(theDownloadUrl);
        });
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <DropZone setImage={(image) => storeImageToStorage(image)}></DropZone>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.addStuff("image", { value: downloadUrl })}
      >
        Lagre
      </Button>
    </>
  );
};

export const ImageProcessor = (props: Props) => {
  return <img className={styles.image} src={props.value} alt={props.value} />;
};
