import React, { useState } from "react";
import { useAtom } from "jotai";
import { FragmentType, pageAtom } from "../atoms/page";
import Button from "@material-ui/core/Button";

import styles from "./TextProcessor.module.scss";
import { DeleteContent } from "../DeleteContent";
import { editingAtom } from "../atoms/editing";

interface Props {
  value: any;
  index: number;
  saveChange: (index: number, values: any) => void;
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

export const TextProcessor = ({ value, index, saveChange }: Props) => {
  const [edit, setEdit] = useState(false);
  const [editing] = useAtom(editingAtom);
  const [newValue, setNewValue] = useState(value);

  function storeChange() {
    setEdit(false);
    saveChange(index, { value: newValue });
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
      <div className={styles.optionsbuttons}>
        {editing && (
          <Button
            className={styles.optionsbutton}
            variant="contained"
            color="primary"
            onClick={() => setEdit(true)}
          >
            Endre
          </Button>
        )}
        <DeleteContent index={index} />
      </div>
      {value}
    </div>
  );
};
