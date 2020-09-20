import React, { useState } from "react";
import { userAtom } from "../atoms/user";
import { useAtom } from "jotai";
import { FragmentType } from "../atoms/page";

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
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <button onClick={() => props.addStuff("text", text)}>Lagre</button>
    </>
  );
};

export const TextProcessor = (props: Props) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(props.value);
  const [user] = useAtom(userAtom);

  if (edit) {
    return (
      <input
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
      {user.editMode && <button onClick={() => setEdit(true)}>Endre</button>}
    </p>
  );
};
