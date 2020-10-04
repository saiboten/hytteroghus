import React, { useState, SetStateAction } from "react";
import { FragmentType } from "../atoms/page";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import styles from "./HeadingProcessor.module.scss";
import { ContentActions } from "./ContentActions";

interface AddProps {
  storeContent: (type: FragmentType, ...data: any[]) => void;
  value?: any;
  index?: number;
  center?: "true" | "false";
}

export const AddHeading = ({
  value,
  center: centerProp,
  storeContent,
}: AddProps) => {
  const [text, setText] = useState(value || "");
  const [center, setCenter] = useState(centerProp || "true");

  return (
    <div className={styles.addwrapper}>
      <p>Legg til tekst.</p>

      <textarea
        className={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="Sentrert tekst?"
          name="center"
          value={center}
          onChange={(value) => {
            setCenter(value.target.value as SetStateAction<"true" | "false">);
          }}
        >
          <FormControlLabel value="true" control={<Radio />} label="Sentrert" />
          <FormControlLabel
            value="false"
            control={<Radio />}
            label="Venstrejustert"
          />
        </RadioGroup>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={() => storeContent("heading", { value: text, center })}
      >
        Lagre
      </Button>
    </div>
  );
};

interface Props {
  value?: any;
  save: (values: any) => void;
  center?: "true" | "false";
  deleteContent: () => void;
}

export const HeadingProcessor = ({
  value,
  center,
  save,
  deleteContent,
}: Props) => {
  const [edit, setEdit] = useState(false);

  function storeChange(_: FragmentType, data: any[]) {
    setEdit(false);
    save(data);
  }

  if (edit) {
    return (
      <AddHeading
        center={center}
        value={value}
        storeContent={storeChange}
      ></AddHeading>
    );
  }

  return (
    <div>
      <ContentActions
        deleteContent={deleteContent}
        edit={() => setEdit(true)}
      />
      <div
        className={`${styles.text} 
      ${center === "true" ? styles[`text--center`] : ""}`}
      >
        <h1>{value}</h1>
      </div>
    </div>
  );
};
