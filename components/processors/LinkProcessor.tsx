import React, { useState } from "react";
import Link from "next/link";
import { FragmentType } from "../atoms/page";
import styles from "./Link.module.scss";
import Button from "@material-ui/core/Button";
import { ContentActions } from "./ContentActions";

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

interface Props {
  link: string;
  linkText: string;
  save: (values: any) => void;
  deleteContent: () => void;
}

export const LinkProcessor = ({
  link,
  linkText,
  save,
  deleteContent,
}: Props) => {
  const [edit, setEdit] = useState(false);
  const [newLinkValue, setNewLinkValue] = useState(link);
  const [newLinkTextValue, setNewLinkTextValue] = useState(linkText);

  if (edit) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          save({ link: newLinkValue, linkText: newLinkTextValue });
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
    <div>
      <Link href={link}>
        <a className={styles.link}>{linkText}</a>
      </Link>
      <ContentActions
        deleteContent={deleteContent}
        edit={() => setEdit(true)}
      />
    </div>
  );
};
