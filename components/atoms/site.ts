import { atom } from "jotai";

interface SiteAtomType {
  collection: string;
  admins: string[];
  siteloaded: boolean;
}

export const siteAtom = atom<SiteAtomType>({
  collection: "",
  admins: [],
  siteloaded: false,
});
