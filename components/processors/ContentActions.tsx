import React from "react";

import styles from "./ContentActions.module.scss";
import Button from "@material-ui/core/Button";

import { DeleteContent } from "../DeleteContent";
import { useAtom } from "jotai";
import { editingAtom } from "../atoms/editing";

interface Props {
  edit?: () => void;
  deleteContent: () => void;
}

export const ContentActions = ({ edit, deleteContent }: Props) => {
  const [editing] = useAtom(editingAtom);

  if (!editing) {
    return null;
  }

  return (
    <div className={styles.optionsbuttons}>
      {edit && (
        <Button
          className={styles.optionsbutton}
          variant="contained"
          color="primary"
          onClick={() => edit()}
        >
          Endre
        </Button>
      )}
      <DeleteContent deleteContent={deleteContent} />
    </div>
  );
};
