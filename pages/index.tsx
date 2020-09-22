import Head from "next/head";
import { useAtom } from "jotai";
import { pageAtom } from "../components/atoms/page";
import { PageProcessor } from "../components/PageProcessor";
import { useFirebaseData } from "../components/firebase/useFirebaseData";
import { firebase } from "../components/firebase/firebase";
import { CreatePage } from "../components/CreatePage";
import Link from "next/link";
import { userAtom } from "../components/atoms/user";
import { EditModeToggler } from "../components/EditModeToggler";
import { useEffect } from "react";
import { siteAtom } from "../components/atoms/site";
import { CreateSite } from "../components/CreateSite";

function HomeWithSiteLoaded() {
  const [page] = useAtom(pageAtom);
  const [site, setSite] = useAtom(siteAtom);
  const [user] = useAtom(userAtom);

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
            ...snapshot,
          });
        }
      });
  }, []);

  useFirebaseData("home");

  console.log(site.admins);

  if (site.admins.length === 0) {
    return <CreateSite />;
  }

  if (!page.title) {
    return <CreatePage pageToBeCreated="home" />;
  }

  return (
    <div>
      <Head>
        <title>Hytta</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{page.title}</h1>
        <PageProcessor />
      </main>

      {!user.uid && (
        <Link href="/login">
          <a>Logg inn</a>
        </Link>
      )}

      <EditModeToggler />

      <footer>Footer here</footer>
    </div>
  );
}

interface Props {
  siteProp: string;
}

export default function Home({ siteProp }: Props) {
  const [site, setSite] = useAtom(siteAtom);

  useEffect(() => {
    setSite({
      ...site,
      collection: siteProp,
    });
  }, [siteProp]);

  if (site.collection === "") {
    return <div>Laster</div>;
  }

  return <HomeWithSiteLoaded />;
}

Home.getInitialProps = async (ctx: any) => {
  return { siteProp: "lyngdotten" };
};
