import { useAtom } from "jotai";
import { useEffect } from "react";
import { siteAtom } from "../../components/atoms/site";
import { HomeWithSiteLoaded } from "../../components/HomePageSiteLoaded";

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
  return { siteProp: ctx.req.headers.host.split(".")[0] };
};
