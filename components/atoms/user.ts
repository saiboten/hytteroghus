import { atom } from "jotai";

interface UserType {
  uid: string | undefined;
}

export const userAtom = atom<UserType>({
  uid: undefined,
});
