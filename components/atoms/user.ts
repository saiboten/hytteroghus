import { atom } from "jotai";

interface UserType {
  admin: boolean;
  editMode: boolean;
  uid: string | undefined;
}

export const userAtom = atom<UserType>({
  admin: false,
  editMode: false,
  uid: undefined,
});
