import React, { useState } from "react";
import Link from "next/link";
import { FragmentType } from "../atoms/page";
import styles from "./Link.module.scss";
import Button from "@material-ui/core/Button";

interface Props {
  link: string;
  linkText: string;
  index: number;
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

export const LinkProcessor = (props: Props) => {
  return (
    <Link href={props.link}>
      <a className={styles.link}>{props.linkText}</a>
    </Link>
  );
};
