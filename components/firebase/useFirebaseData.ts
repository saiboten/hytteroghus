import { useEffect } from "react";
import { firebase } from "./firebase";
import { useAtom } from "jotai";
import { pageAtom } from "../atoms/page";
import { siteAtom } from "../atoms/site";

export const useFirebaseData = (pageId: string) => {
  const [, setPage] = useAtom(pageAtom);
  const [site] = useAtom(siteAtom);

  useEffect(() => {
    if (!pageId) {
      return;
    }
    const db = firebase.firestore();
    const unsub = db
      .collection(site.collection)
      .doc(pageId)
      .onSnapshot((querySnapshot: any) => {
        console.log(querySnapshot.data());
        setPage(querySnapshot.data() || {});
      });
    return () => {
      unsub();
    };
  }, [pageId]);
};
