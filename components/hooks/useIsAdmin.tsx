import { siteAtom } from "../atoms/site";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/user";

export const useIsAdmin = () => {
  const [site] = useAtom(siteAtom);
  const [user] = useAtom(userAtom);

  return site.admins.includes(user.uid || "");
};
