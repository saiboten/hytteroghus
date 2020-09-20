import Head from "next/head";
import Link from "next/link";

import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { pageAtom } from "../../components/atoms/page";
import { PageProcessor } from "../../components/PageProcessor";
import { useFirebaseData } from "../../components/firebase/useFirebaseData";
import { EditModeToggler } from "../../components/EditModeToggler";

export default function Home() {
  const router = useRouter();

  const [page] = useAtom(pageAtom);
  const { pageId } = router.query;

  useFirebaseData(pageId as string);

  return (
    <div>
      <Head>
        <title>Hytta</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/">
          <a>Hjem</a>
        </Link>

        <h1>{page.title}</h1>
        <PageProcessor />
      </main>

      <EditModeToggler />

      <footer>Footer here</footer>
    </div>
  );
}
