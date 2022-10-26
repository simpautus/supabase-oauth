import { useFetcher } from "@remix-run/react";
import supabase from "~/utils/supabase";

export function useSignOut() {
  const fetcher = useFetcher();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log({ error });
    fetcher.submit(
      {},
      {
        method: "post",
        action: "/api/auth/logout",
      }
    );
  };
  return { signOut };
}
