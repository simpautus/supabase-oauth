import type {
  ActionFunction,
  DataFunctionArgs,
  LoaderFunction
} from "@remix-run/node";
import {
  redirect,
} from "@remix-run/node";
import type { SupabaseClient, User } from "@supabase/supabase-js";

import { getSession } from "./session";
import supabase from "./supabase";

type FunctionArgs = DataFunctionArgs & {
  user: User | null;
  supabaseClient: SupabaseClient;
};
type WithAuthReturnType =
  | ReturnType<LoaderFunction>
  | ReturnType<ActionFunction>;

const withAuth =
  (
    fn: (args: FunctionArgs) => WithAuthReturnType,
    { required = true }: { required?: boolean } = {}
  ) =>
  async (context: DataFunctionArgs) => {

    const session = await getSession(context.request.headers.get("Cookie"));

    const accessToken = session.get("accessToken");
    const refreshToken = session.get("refreshToken");

    const { data: { user } } = await supabase.auth.getUser(accessToken)

    if (!user && required) {
      return redirect("/login");
    }

    if (user) {
      supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
    }

    return fn({
      ...context,
      // user,
      user: null,
      supabaseClient: supabase,
    });
  };

export default withAuth;
