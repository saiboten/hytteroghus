import React, { useState } from "react";
import { FragmentType } from "../../atoms/page";
import Button from "@material-ui/core/Button";
import { DropZone } from "./DropZone";
import { firebase } from "../../firebase/firebase";
import { siteAtom } from "../../atoms/site";
import { useAtom } from "jotai";
import { usePageId } from "../../hooks/usePageId";
import { create_UUID } from "../../util/uuid";

import styles from "./ImageProcessor.module.scss";
import { ContentActions } from "../ContentActions";

interface AddProps {
  addStuff: (type: FragmentType, ...data: any[]) => void;
}

export const AddImage = ({ addStuff }: AddProps) => {
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
        onClick={() => addStuff("image", { value: downloadUrl })}
      >
        Lagre
      </Button>
    </>
  );
};

interface Props {
  value: string;
  save: (values: any) => void;
  deleteContent: () => void;
}

export const ImageProcessor = ({ save, deleteContent, value }: Props) => {
  return (
    <div>
      <img className={styles.image} src={value} alt={value} />
      <ContentActions deleteContent={deleteContent} />
    </div>
  );
};
