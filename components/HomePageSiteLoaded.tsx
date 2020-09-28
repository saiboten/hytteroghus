import Head from "next/head";

import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { pageAtom } from "../components/atoms/page";
import { PageProcessor } from "../components/PageProcessor";
import { useFirebaseData } from "../components/firebase/useFirebaseData";
import { EditModeToggler } from "../components/EditModeToggler";
import { useEffect } from "react";
import { firebase } from "../components/firebase/firebase";
import { siteAtom } from "./atoms/site";
import { CreateSite } from "./CreateSite";
import { CreatePage } from "./CreatePage";

export function HomeWithSiteLoaded({ homePage }: { homePage?: string }) {
  const router = useRouter();
  const [site, setSite] = useAtom(siteAtom);

  const [page] = useAtom(pageAtom);
  const { pageId } = router.query;

  useEffect(() => {
    firebase
      .firestore()
      .collection("config")
      .doc(site.collection)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setSite({
            ...site,
            ...snapshot.data(),
          });
        }
      });
  }, [site.collection]);

  useFirebaseData(homePage || (pageId as string));

  if (site.admins.length === 0) {
    return <CreateSite />;
  }

  if (!page.title) {
    return <CreatePage pageToBeCreated={homePage || (pageId as string)} />;
  }

  return (
    <div>
      <Head>
        <title>Hytta</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EditModeToggler />

      <main>
        <PageProcessor />
      </main>
    </div>
  );
}
