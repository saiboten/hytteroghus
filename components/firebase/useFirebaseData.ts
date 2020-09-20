import { useEffect } from "react";
import { firebase } from "./firebase";
import { useAtom } from "jotai";
import { pageAtom } from "../atoms/page";
import { siteAtom } from "../atoms/site";
import { userAtom } from "../atoms/user";

export const useFirebaseData = (pageId: string) => {
  const [, setPage] = useAtom(pageAtom);
  const [site] = useAtom(siteAtom);
  const [user] = useAtom(userAtom);

  useEffect(() => {
    if (!pageId) {
      return;
    }
    const db = firebase.firestore();
    const unsub = db
      .collection(site.collection)
      .doc(pageId)
      .onSnapshot((querySnapshot: any) => {
        var data = querySnapshot.data();
        if (data && data.admins && data.admins.includes(user.uid)) {
          setPage({ ...data, admin: true } || {});
        } else {
          setPage({ ...data } || {});
        }
      });
    return () => {
      unsub();
    };
  }, [pageId]);
};
