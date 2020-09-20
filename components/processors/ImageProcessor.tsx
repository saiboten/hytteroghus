import React, { useState } from "react";
import { FragmentType } from "../atoms/page";
import Button from "@material-ui/core/Button";

interface Props {
  value: string;
  index: number;
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.addStuff("image", { value: image })}
      >
        Lagre
      </Button>
    </>
  );
};

export const ImageProcessor = (props: Props) => {
  return <img src={props.value} alt={props.value} />;
};
