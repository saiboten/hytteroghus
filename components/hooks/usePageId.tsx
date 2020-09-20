import { useRouter } from "next/router";

export const usePageId = () => {
  const router = useRouter();
  let { pageId } = router.query;

  if (pageId === undefined) {
    pageId = "home";
  }

  return pageId as string;
};
