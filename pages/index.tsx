import Head from "next/head";
import { useAtom } from "jotai";
import { pageAtom } from "../components/atoms/page";
import { PageProcessor } from "../components/PageProcessor";
import { useFirebaseData } from "../components/firebase/useFirebaseData";
import { CreatePage } from "../components/CreatePage";
import Link from "next/link";
import { userAtom } from "../components/atoms/user";
import { EditModeToggler } from "../components/EditModeToggler";

export default function Home() {
  const [page] = useAtom(pageAtom);
  const [user] = useAtom(userAtom);

  useFirebaseData("home");

  if (!page.admins) {
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
