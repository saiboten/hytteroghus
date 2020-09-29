import React from "react";
import Button from "@material-ui/core/Button";

interface Props {
  deleteContent: () => void;
}

export const DeleteContent = ({ deleteContent }: Props) => {
  return (
    <Button variant="contained" color="primary" onClick={deleteContent}>
      Slett innhold
    </Button>
  );
};
