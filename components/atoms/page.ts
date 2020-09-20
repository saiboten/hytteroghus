import { atom } from "jotai";

export type FragmentType = "image" | "text" | "link";

interface Content {
  id: string;
  type: FragmentType;
  value: string;
  link: string;
  linkText: string;
}

export interface PageAtomType {
  title: string;
  content: Content[];
  admins: string[];
}

export const pageAtom = atom<PageAtomType>({
  admins: ["uid1", "uid2"],
  title: "",
  content: [],
});
