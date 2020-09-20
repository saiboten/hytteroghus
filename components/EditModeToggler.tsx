import React from "react";
import { useAtom } from "jotai";
import { pageAtom } from "./atoms/page";

export function EditModeToggler() {
  const [page, setPage] = useAtom(pageAtom);

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

  if (!page.admin) {
    return null;
  }

  return (
    <>
      {!page.editMode ? (
        <div>
          <button onClick={edit}>Endre innhold</button>Du er logget inn
        </div>
      ) : (
        <button onClick={endEdit}>Avslutt innholdsredigering</button>
      )}
    </>
  );
}
