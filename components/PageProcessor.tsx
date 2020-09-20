import React from "react";
import { pageAtom } from "./atoms/page";
import { useAtom } from "jotai";
import { TextProcessor } from "./processors/TextProcessor";
import { ImageProcessor } from "./processors/ImageProcessor";
import { AddContent } from "./AddContent";
import { DeleteContent } from "./DeleteContent";
import { LinkProcessor } from "./processors/LinkProcessor";

export const PageProcessor = () => {
  const [page] = useAtom(pageAtom);

  return (
    <>
      <AddContent index={-1} />
      {page.content.map((item, index) => {
        var elem = undefined;

        if (item.type === "text") {
          elem = <TextProcessor {...item} />;
        } else if (item.type == "image") {
          elem = <ImageProcessor {...item} />;
        } else if (item.type == "link") {
          elem = <LinkProcessor {...item} />;
        } else {
          throw new Error("Unsupported content type detected");
        }

        return (
          <React.Fragment key={index}>
            {elem}
            <DeleteContent index={index} />
            <AddContent index={index} />
          </React.Fragment>
        );
      })}
    </>
  );
};
