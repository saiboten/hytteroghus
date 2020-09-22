import React from "react";
import { useAtom } from "jotai";
import { pageAtom } from "./atoms/page";
import Button from "@material-ui/core/Button";

import styles from "./EditModeToggler.module.scss";
import { useIsAdmin } from "./hooks/useIsAdmin";

export function EditModeToggler() {
  const [page, setPage] = useAtom(pageAtom);
  const isAdmin = useIsAdmin();

  function edit() {
    setPage({
      ...page,
      editMode: true,
    });
  }

  function endEdit() {
    setPage({
      ...page,
      editMode: false,
    });
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className={styles.container}>
      {!page.editMode ? (
        <Button variant="contained" color="primary" onClick={edit}>
          Endre innhold
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={endEdit}>
          Avslutt innholdsredigering
        </Button>
      )}
    </div>
  );
}
