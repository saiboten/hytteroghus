import React, { useState } from "react";
import { useAtom } from "jotai";
import { FragmentType, pageAtom } from "../atoms/page";

import styles from "./TextProcessor.module.scss";

interface Props {
  value: any;
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
      <button onClick={() => props.addStuff("text", { value: text })}>
        Lagre
      </button>
    </>
  );
};

export const TextProcessor = (props: Props) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(props.value);
  const [page] = useAtom(pageAtom);

  if (edit) {
    return (
      <textarea
        className={styles.textarea}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => {
          alert("Lagret");
          setEdit(false);
        }}
      />
    );
  }

  return (
    <p>
      {props.value}
      {page.editMode && <button onClick={() => setEdit(true)}>Endre</button>}
    </p>
  );
};
