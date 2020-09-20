import { atom } from "jotai";

interface SiteAtomType {
  collection: string;
}

export const siteAtom = atom<SiteAtomType>({
  collection: "lyngdotten",
});
