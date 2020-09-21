import React from "react";
import { pageAtom } from "./atoms/page";
import { useAtom } from "jotai";
import { TextProcessor } from "./processors/TextProcessor";
import { ImageProcessor } from "./processors/ImageProcessor";
import { AddContent } from "./AddContent";
import { LinkProcessor } from "./processors/LinkProcessor";
import { usePageId } from "./hooks/usePageId";
import { CreatePage } from "./CreatePage";
import { firebase } from "./firebase/firebase";
import { siteAtom } from "./atoms/site";

export const PageProcessor = () => {
  const [page] = useAtom(pageAtom);
  const [site] = useAtom(siteAtom);
  const pageId = usePageId();

  if (page.content === undefined) {
    return (
      <div>
        <h1>Side ikke funnet</h1>
        <p>Hei, du har kommet til en side som ikke finnes</p>
        {page.admin && <CreatePage pageToBeCreated={pageId} />}
      </div>
    );
  }

  function saveChange(index: number, newValues: any) {
    const contentCopy = [...page.content];
    contentCopy[index] = {
      ...contentCopy[index],
      ...newValues,
    };

    firebase.firestore().collection(site.collection).doc(pageId).update({
      content: contentCopy,
    });
  }

  return (
    <>
      <AddContent index={-1} />
      {page.content.map((item, index) => {
        var elem = undefined;

        if (item.type === "text") {
          elem = (
            <TextProcessor saveChange={saveChange} index={index} {...item} />
          );
        } else if (item.type == "image") {
          elem = (
            <ImageProcessor saveChange={saveChange} index={index} {...item} />
          );
        } else if (item.type == "link") {
          elem = (
            <LinkProcessor saveChange={saveChange} index={index} {...item} />
          );
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
