import React, { useState } from "react";
import { FragmentType } from "../atoms/page";
import Button from "@material-ui/core/Button";

import styles from "./TextProcessor.module.scss";
import { ContentActions } from "./ContentActions";

interface Props {
  value: any;
  deleteContent: () => void;
  save: (values: any) => void;
}

interface AddProps {
  storeContent: (type: FragmentType, ...data: any[]) => void;
}

export const AddText = (props: AddProps) => {
  const [text, setText] = useState("");

  return (
    <>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.storeContent("text", { value: text })}
      >
        Lagre
      </Button>
    </>
  );
};

export const TextProcessor = ({ value, deleteContent, save }: Props) => {
  const [edit, setEdit] = useState(false);
  const [newValue, setNewValue] = useState(value);

  function storeChange() {
    setEdit(false);
    save({ value: newValue });
  }

  if (edit) {
    return (
      <textarea
        className={styles.textarea}
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        onBlur={storeChange}
      />
    );
  }

  return (
    <div className={styles.text}>
      <ContentActions
        edit={() => setEdit(true)}
        deleteContent={deleteContent}
      />
      {value}
    </div>
  );
};
