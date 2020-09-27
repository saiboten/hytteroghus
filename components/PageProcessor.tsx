import React from "react";
import { pageAtom } from "./atoms/page";
import { useAtom } from "jotai";
import { TextProcessor } from "./processors/TextProcessor";
import { ImageProcessor } from "./processors/Image/ImageProcessor";
import { AddContent } from "./AddContent";
import { LinkProcessor } from "./processors/LinkProcessor";
import { usePageId } from "./hooks/usePageId";
import { CreatePage } from "./CreatePage";
import { firebase } from "./firebase/firebase";
import { siteAtom } from "./atoms/site";
import { useIsAdmin } from "./hooks/useIsAdmin";
import styles from "./PageProcessor.module.scss";
import { HeadingProcessor } from "./processors/HeadingProcessor";
import { editingAtom } from "./atoms/editing";

export const PageProcessor = () => {
  const [page] = useAtom(pageAtom);
  const [editing] = useAtom(editingAtom);
  const [site] = useAtom(siteAtom);
  const pageId = usePageId();
  const isAdmin = useIsAdmin();

  if (page.content === undefined) {
    return (
      <div>
        <h1>Side ikke funnet</h1>
        <p>Hei, du har kommet til en side som ikke finnes</p>
        {isAdmin && <CreatePage pageToBeCreated={pageId} />}
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
        } else if (item.type == "heading") {
          elem = (
            <HeadingProcessor saveChange={saveChange} index={index} {...item} />
          );
        } else {
          throw new Error("Unsupported content type detected");
        }

        return (
          <React.Fragment key={index}>
            <div className={editing ? styles.wrapper : ""}>{elem}</div>
            <AddContent index={index} />
          </React.Fragment>
        );
      })}
    </>
  );
};
