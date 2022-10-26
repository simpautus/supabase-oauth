import { createCookieSessionStorage } from "@remix-run/node";
import type { User } from "@supabase/supabase-js";

import supabase from "./supabase";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "sb:token",
      maxAge: 60 * 59,
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      secure: true,
      secrets: ["supabase is the dopest!"],
    },
  });

export { getSession, commitSession, destroySession };

export const getUser = async (request: Request): Promise<User | null> => {
  const session = await getSession(request.headers.get("Cookie"));

  const accessToken = session.get("accessToken");

  const {
    data: { user },
  } = await supabase.auth.getUser(accessToken);

  return user;
};
