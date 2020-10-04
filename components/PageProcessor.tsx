import React from "react";
import { pageAtom, FragmentType } from "./atoms/page";
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
import { create_UUID } from "./util/uuid";

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

  function storeContentFirst(type: FragmentType, rest: any) {
    const contentCopy = [...page.content];

    contentCopy.unshift({
      type: type,
      id: create_UUID(),
      ...rest,
    });

    firebase.firestore().collection(site.collection).doc(pageId).update({
      content: contentCopy,
    });
  }

  return (
    <div className={`${editing ? styles.container : ""}`}>
      <AddContent store={storeContentFirst} />
      {page.content.map((item, index) => {
        function save(rest: any, fragmentType: FragmentType, insert = false) {
          const contentCopy = [...page.content];

          if (insert) {
            contentCopy.splice(index + 1, 0, {
              id: create_UUID(),
              type: fragmentType,
              ...rest,
            });
          } else {
            contentCopy[index] = {
              ...contentCopy[index],
              ...rest,
              type: fragmentType,
            };
          }

          firebase.firestore().collection(site.collection).doc(pageId).update({
            content: contentCopy,
          });
        }

        function deleteContent() {
          const contentCopy = [...page.content];
          contentCopy.splice(index, 1);

          firebase.firestore().collection(site.collection).doc(pageId).update({
            content: contentCopy,
          });
        }

        let elem = undefined;

        if (item.type === "text") {
          elem = (
            <TextProcessor
              save={(data) => save(data, "text")}
              deleteContent={deleteContent}
              {...item}
            />
          );
        } else if (item.type == "image") {
          elem = (
            <ImageProcessor
              save={(data) => save(data, "image")}
              deleteContent={deleteContent}
              {...item}
            />
          );
        } else if (item.type == "link") {
          elem = (
            <LinkProcessor
              save={(data) => save(data, "link")}
              deleteContent={deleteContent}
              {...item}
            />
          );
        } else if (item.type == "heading") {
          elem = (
            <HeadingProcessor
              save={(data) => save(data, "heading")}
              deleteContent={deleteContent}
              {...item}
            />
          );
        } else {
          console.log(item);
          throw new Error("Unsupported content type detected");
        }

        return (
          <React.Fragment key={index}>
            <div className={editing ? styles.wrapper : ""}>{elem}</div>
            <AddContent
              store={(fragment, data) => save(data, fragment, true)}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};
