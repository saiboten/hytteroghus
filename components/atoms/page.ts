import { atom } from "jotai";

export type FragmentType = "image" | "text" | "link" | "heading";

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
}

export const pageAtom = atom<PageAtomType>({
  title: "",
  content: [],
});
