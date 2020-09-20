import React from "react";
import { useAtom } from "jotai";
import { userAtom } from "./atoms/user";

export function EditModeToggler() {
  const [user, setUser] = useAtom(userAtom);

  function edit() {
    setUser({
      ...user,
      editMode: true,
    });
  }

  function endEdit() {
    setUser({
      ...user,
      editMode: false,
    });
  }
  return (
    <>
      {user.uid && !user.editMode ? (
        <div>
          <button onClick={edit}>Endre innhold</button>Du er logget inn
        </div>
      ) : (
        <button onClick={endEdit}>Avslutt innholdsredigering</button>
      )}
    </>
  );
}
