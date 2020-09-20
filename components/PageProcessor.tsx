import React from "react";
import { pageAtom } from "./atoms/page";
import { useAtom } from "jotai";
import { TextProcessor } from "./processors/TextProcessor";
import { ImageProcessor } from "./processors/ImageProcessor";
import { AddContent } from "./AddContent";
import { LinkProcessor } from "./processors/LinkProcessor";
import { usePageId } from "./hooks/usePageId";
import { CreatePage } from "./CreatePage";

export const PageProcessor = () => {
  const [page] = useAtom(pageAtom);
  const [pageId] = usePageId();

  if (page.content === undefined) {
    return (
      <div>
        <h1>Side ikke funnet</h1>
        <p>Hei, du har kommet til en side som ikke finnes</p>
        {page.admin && <CreatePage pageToBeCreated={pageId} />}
      </div>
    );
  }

  return (
    <>
      <AddContent index={-1} />
      {page.content.map((item, index) => {
        var elem = undefined;

        if (item.type === "text") {
          elem = <TextProcessor index={index} {...item} />;
        } else if (item.type == "image") {
          elem = <ImageProcessor index={index} {...item} />;
        } else if (item.type == "link") {
          elem = <LinkProcessor index={index} {...item} />;
        } else {
          throw new Error("Unsupported content type detected");
        }

        return (
          <React.Fragment key={index}>
            {elem}
            <AddContent index={index} />
          </React.Fragment>
        );
      })}
    </>
  );
};
