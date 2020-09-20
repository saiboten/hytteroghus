import React, { useState } from "react";
import { FragmentType } from "../atoms/page";

interface Props {
  value: string;
}

interface AddProps {
  addStuff: (type: FragmentType, ...data: any[]) => void;
}

export const AddImage = (props: AddProps) => {
  const [image, setImage] = useState("");

  return (
    <>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>
      <button onClick={() => props.addStuff("image", { value: image })}>
        Lagre
      </button>
    </>
  );
};

export const ImageProcessor = (props: Props) => {
  return <img src={props.value} alt={props.value} />;
};
