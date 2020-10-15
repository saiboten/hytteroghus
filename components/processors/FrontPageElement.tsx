import styles from "./FrontPageElement.module.scss";
import Link from "next/link";
import { FragmentType } from "../atoms/page";

interface AddFrontPageElementProps {
  storeContent: (type: FragmentType, ...data: any[]) => void;
  value?: any;
  index?: number;
  center?: "true" | "false";
}

export const AddFrontPageElement = ({
  value,
  center: centerProp,
  storeContent,
}: AddFrontPageElementProps) => {
  const [text, setText] = useState(value || "");

  return (
    <div className={styles.addwrapper}>
      <div className={styles.savebutton}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => storeContent("heading", { value: text, center })}
        >
          Lagre
        </Button>
      </div>

      <input
        className={`${styles.textarea} ${
          center === "true" ? styles["textarea--centered"] : ""
        }`}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>

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
          <FormControlLabel
            value="false"
            control={<Radio />}
            label="Venstrejustert"
          />
          <FormControlLabel value="true" control={<Radio />} label="Sentrert" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export const FrontPageElement = ({ description, href, ...rest }: any) => {]



  return (
    <Link className={styles.link} href={href}>
      <div
        style={{
          flex: "0 0 50%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className={styles.imagewrapper}>
          <img className={styles.image} {...rest} />
        </div>
      </div>
      <div className={styles.description}>{description}</div>
    </Link>
  );
};
