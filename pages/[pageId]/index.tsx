import { useAtom } from "jotai";
import { useEffect } from "react";
import { siteAtom } from "../../components/atoms/site";
import { HomeWithSiteLoaded } from "../../components/HomePageSiteLoaded";

export default function Home() {
  const [site, setSite] = useAtom(siteAtom);

  useEffect(() => {
    setSite({
      ...site,
      collection: window.location.host.split(".")[0],
    });
  }, []);

  if (site.collection === "") {
    return <div>Laster</div>;
  }

  return <HomeWithSiteLoaded />;
}

Home.getInitialProps = async () => {
  return {};
};
