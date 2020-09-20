import React, { useState } from "react";
import { useAtom } from "jotai";
import { FragmentType, pageAtom } from "../atoms/page";
import Button from "@material-ui/core/Button";

import styles from "./TextProcessor.module.scss";
import { DeleteContent } from "../DeleteContent";

interface Props {
  value: any;
  index: number;
}

interface AddProps {
  addStuff: (type: FragmentType, ...data: any[]) => void;
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
        onClick={() => props.addStuff("text", { value: text })}
      >
        Lagre
      </Button>
    </>
  );
};

export const TextProcessor = ({ value, index }: Props) => {
  const [edit, setEdit] = useState(false);
  const [newValue, setNewValue] = useState(value);
  const [page] = useAtom(pageAtom);

  if (edit) {
    return (
      <textarea
        className={styles.textarea}
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        onBlur={() => {
          alert("Lagret");
          setEdit(false);
        }}
      />
    );
  }

  return (
    <div>
      {value}
      <div className={styles.optionsbuttons}>
        {page.editMode && (
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
    </div>
  );
};
