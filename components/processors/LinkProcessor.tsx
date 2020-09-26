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

export const LinkProcessor = ({ link, linkText, index, saveChange }: Props) => {
  const [edit, setEdit] = useState(false);
  const [newLinkValue, setNewLinkValue] = useState(link);
  const [newLinkTextValue, setNewLinkTextValue] = useState(linkText);
  const [page] = useAtom(pageAtom);

  if (edit) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveChange(index, { link: newLinkValue, linkText: newLinkTextValue });
          setEdit(false);
        }}
      >
        <fieldset>
          <label htmlFor="newLink">Ny lenke: </label>
          <input
            id="newLink"
            value={newLinkValue}
            onChange={(e) => setNewLinkValue(e.target.value)}
          />
          <label htmlFor="newLinkText">Ny lenketekst: </label>
          <input
            id="newLinkText"
            value={newLinkTextValue}
            onChange={(e) => setNewLinkTextValue(e.target.value)}
          />
        </fieldset>
        <button type="submit">Lagre</button>
      </form>
    );
  }

  return (
    <>
      <Link href={link}>
        <a className={styles.link}>{linkText}</a>
      </Link>
      <div className={styles.optionsbuttons}>
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
      </div>
    </>
  );
};
