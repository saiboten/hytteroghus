import React, { useState } from "react";
import Link from "next/link";
import { FragmentType } from "../atoms/page";
import styles from "./Link.module.scss";

interface Props {
  link: string;
  linkText: string;
}

interface AddProps {
  addStuff: (type: FragmentType, ...data: any[]) => void;
}

export const AddLink = (props: AddProps) => {
  const [link, setLink] = useState("");
  const [linkText, setLinkText] = useState("");

  return (
    <>
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      ></input>
      <input
        type="text"
        value={linkText}
        onChange={(e) => setLinkText(e.target.value)}
      ></input>
      <button onClick={() => props.addStuff("link", { link, linkText })}>
        Lagre
      </button>
    </>
  );
};

export const LinkProcessor = (props: Props) => {
  return (
    <Link href={props.link}>
      <a className={styles.link}>{props.linkText}</a>
    </Link>
  );
};
