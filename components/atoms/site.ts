import { atom } from "jotai";

interface SiteAtomType {
  collection: string;
  admins: string[];
}

export const siteAtom = atom<SiteAtomType>({
  collection: "",
  admins: [],
});
