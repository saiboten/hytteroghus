import React, { useState } from "react";
import Link from "next/link";
import { FragmentType, pageAtom } from "../atoms/page";
import styles from "./Link.module.scss";
import Button from "@material-ui/core/Button";
import { useAtom } from "jotai";
import { DeleteContent } from "../DeleteContent";

interface Props {
  link: string;
  linkText: string;
  index: number;
  saveChange: (index: number, values: any) => void;
}

interface AddProps {
  addStuff: (type: FragmentType, ...data: any[]) => void;
}

export const AddLink = (props: AddProps) => {
  const [link, setLink] = useState("");
  const [linkText, setLinkText] = useState("");

  return (
    <form>
      <fieldset>
        <label htmlFor="link">Lenke til</label>
        <input
          id="link"
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        ></input>
      </fieldset>
      <fieldset>
        <label htmlFor="linkText">Lenketekst</label>
        <input
          id="linkText"
          type="text"
          value={linkText}
          onChange={(e) => setLinkText(e.target.value)}
        ></input>
      </fieldset>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.addStuff("link", { link, linkText })}
      >
        Lagre
      </Button>
    </form>
  );
};

export const LinkProcessor = ({ link, linkText, index }: Props) => {
  const [edit, setEdit] = useState(false);
  const [newLinkValue, setNewLinkValue] = useState(link);
  const [newLinkTextValue, setNewLinkTextValue] = useState(linkText);
  const [page] = useAtom(pageAtom);

  return (
    <>
      <Link href={link}>
        <a className={styles.link}>{linkText}</a>
      </Link>
      {page.editMode && (
        <Button
          className={styles.optionsbutton}
          variant="contained"
          color="primary"
          onClick={() => setEdit(true)}
        >
          Endre
        </Button>
      )}
      <DeleteContent index={index} />
    </>
  );
};
